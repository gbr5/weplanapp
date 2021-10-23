import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { getAll, Contact } from 'react-native-contacts';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { useEventGuests } from './eventGuests';

interface UserContactsContextType {
  loading: boolean;
  mobileContacts: Contact[];
  selectedMobileContacts: Contact[];
  selectMobileContactsWindow: boolean;
  importGuestNotice: boolean;
  handleImportGuestNotice: () => void;
  getUserMobileContacts: () => Promise<void>;
  handleNewMobileGuest: () => Promise<void>;
  verifyAccess: () => Promise<void>;
  handleResetSelectedMobileContacts: () => void;
  handleSelectMobileContactsWindow: (data: boolean) => void;
  handleSelectedMobileContacts: (data: Contact) => void;
}

const UserContactsContext = createContext({} as UserContactsContextType);

const UserContactsProvider: React.FC = ({ children }) => {
  const { newGuestWindow, handleNewGuestWindow } = useEventGuests();

  const [loading, setLoading] = useState(false);
  const [importGuestNotice, setImportGuestNotice] = useState(false);
  const [mobileContacts, setMobileContacts] = useState<Contact[]>([]);
  const [selectedMobileContacts, setSelectedMobileContacts] = useState<Contact[]>([]);
  const [selectMobileContactsWindow, setSelectMobileContactsWindow] = useState(false);

  useEffect(() => {
    () => (
      async function loadData() {
        const data = await AsyncStorage.getItem(`@WP-App:mobile-contacts`);
        if (data) {
          setMobileContacts(JSON.parse(data));
        }
      }
    )();
  }, []);

  function handleImportGuestNotice() {
    newGuestWindow && handleNewGuestWindow();
    setImportGuestNotice(!importGuestNotice);
  }

  function handleSelectMobileContactsWindow(data: boolean) {
    setSelectMobileContactsWindow(data);
  }
  function handleResetSelectedMobileContacts() {
    setSelectedMobileContacts([]);
  }
  function handleSelectedMobileContacts(data: Contact) {
    const findContact = selectedMobileContacts.findIndex(contact => contact.recordID === data.recordID);
    if (findContact >= 0) {
      const contacts = selectedMobileContacts.filter(contact => contact.recordID !== data.recordID);
      setSelectedMobileContacts(contacts);
    } else {
      const contacts = [
        ...selectedMobileContacts,
        data,
      ];
      setSelectedMobileContacts(contacts);
    }
  }

  async function getUserMobileContacts() {
    try {
      setLoading(true);
      const storedContacts = await AsyncStorage.getItem('@WP-App:mobile-contacts');
      if (storedContacts && storedContacts.length > 0) {
        const parsedContacts = JSON.parse(storedContacts);
        if (parsedContacts.length > 0) return setMobileContacts(parsedContacts);
      }
      if (Platform.OS === 'ios') {
        const response = await getAll();
        if (response.length > 0) {
          await AsyncStorage.setItem('@WP-App:mobile-contacts', JSON.stringify(response));
          setMobileContacts(response.sort((a, b) => {
            if (a.givenName.toLowerCase() > b.givenName.toLowerCase()) return 1;
            if (a.givenName.toLowerCase() > b.givenName.toLowerCase()) return -1;
            return 0;
          }));
        }
      } else {
        const permission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
        const checkPermission = await PermissionsAndroid.check(permission);
        if (!checkPermission) {
          const access = await PermissionsAndroid.request(permission,
            {
              title: 'Importar Lista Convidados!',
              message: "Permitir a WePlan acessar e fazer o upload (nos seus servidores) dos contatos selecionado por você.",
              buttonPositive: 'Importar Convidados',
              buttonNegative: 'Não importar',
              buttonNeutral: 'Talvez mais tarde'
            });
          if (access === 'granted') {
            const response = await getAll();
            if (response.length > 0) {
              await AsyncStorage.setItem('@WP-App:mobile-contacts', JSON.stringify(response));
              setMobileContacts(response.sort((a, b) => {
                if (a.givenName.toLowerCase() > b.givenName.toLowerCase()) return 1;
                if (a.givenName.toLowerCase() < b.givenName.toLowerCase()) return -1;
                if (a.familyName.toLowerCase() > b.familyName.toLowerCase()) return 1;
                if (a.familyName.toLowerCase() < b.familyName.toLowerCase()) return -1;
                return 0;
              }));
            }
          } else {
            Alert.alert(
              'Acesso a contatos não concedido!',
              'Para adicionar convidados através da sua lista de contatos, você terá de liberar o acesso nas configurações do seu aparelho',
            );
            setSelectMobileContactsWindow(false);
          }
        } else {
          const response = await getAll();
          if (response.length > 0) {
            await AsyncStorage.setItem('@WP-App:mobile-contacts', JSON.stringify(response));
            setMobileContacts(response.sort((a, b) => {
              if (a.givenName.toLowerCase() > b.givenName.toLowerCase()) return 1;
              if (a.givenName.toLowerCase() < b.givenName.toLowerCase()) return -1;
              if (a.familyName.toLowerCase() > b.familyName.toLowerCase()) return 1;
              if (a.familyName.toLowerCase() < b.familyName.toLowerCase()) return -1;
              return 0;
            }));
          }
        }
      }
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }


  async function handleNewMobileGuest() {
    importGuestNotice && handleImportGuestNotice();
    await getUserMobileContacts();
    handleSelectMobileContactsWindow(true);
  }

  async function verifyAccess() {
    if (Platform.OS === 'android') {
      const permission = PermissionsAndroid.PERMISSIONS.READ_CONTACTS;
      const checkPermission = await PermissionsAndroid.check(permission);
      if (!checkPermission) {
        handleImportGuestNotice();
      }
      checkPermission && handleNewMobileGuest();
    } else {
      handleNewMobileGuest();
    }
  }

  return (
    <UserContactsContext.Provider
      value={{
        getUserMobileContacts,
        handleSelectMobileContactsWindow,
        handleSelectedMobileContacts,
        handleResetSelectedMobileContacts,
        loading,
        mobileContacts,
        selectMobileContactsWindow,
        selectedMobileContacts,
        handleImportGuestNotice,
        importGuestNotice,
        handleNewMobileGuest,
        verifyAccess,
      }}
    >
      {children}
    </UserContactsContext.Provider>
  );
}

function useUserContacts(): UserContactsContextType {
  const context = useContext(UserContactsContext);

  if (!context) throw new Error('useUserContacts must be used within an AuthProvider!')
  return context;
}

export { UserContactsProvider, useUserContacts };
