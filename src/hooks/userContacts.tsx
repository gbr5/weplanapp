import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { getAll, Contact } from 'react-native-contacts';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

interface UserContactsContextType {
  loading: boolean;
  mobileContacts: Contact[];
  selectedMobileContacts: Contact[];
  selectMobileContactsWindow: boolean;
  getUserMobileContacts: () => Promise<void>;
  handleResetSelectedMobileContacts: () => void;
  handleSelectMobileContactsWindow: (data: boolean) => void;
  handleSelectedMobileContacts: (data: Contact) => void;
}

const UserContactsContext = createContext({} as UserContactsContextType);

const UserContactsProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [mobileContacts, setMobileContacts] = useState<Contact[]>([]);
  const [selectedMobileContacts, setSelectedMobileContacts] = useState<Contact[]>([]);
  const [selectMobileContactsWindow, setSelectMobileContactsWindow] = useState(false);

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
      if (storedContacts) {
        const parsedContacts = JSON.parse(storedContacts);
        return setMobileContacts(parsedContacts);
      }
      const contacts: Contact[] = [];
      if (Platform.OS === 'ios') {
        const response = await getAll();
        response.map(contact => contacts.push(contact));
      } else {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Importar Lista Convidados!',
            message: 'A WePlan está requisitando acesso a sua lista de contatos.',
            buttonPositive: 'Importar Convidados',
          }).then(access => {
            if (access === 'granted') {
              getAll().then(response => {
                response.map(contact => contacts.push(contact));
              });
            } else {
              Alert.alert(
                'Acesso a contatos não concedido!',
                'Para adicionar convidados através da sua lista de contatos, você terá de liberar o acesso nas configurações do seu aparelho',
              );
              handleSelectMobileContactsWindow(false);
            }
          });
      }
      const sortedContacts = contacts.sort((a, b) => {
        if (a.givenName.toUpperCase() > b.givenName.toUpperCase()) return 1;
        if (a.givenName.toUpperCase() < b.givenName.toUpperCase()) return -1;
        return 0;
      });

      await AsyncStorage.setItem('@WP-App:mobile-contacts', JSON.stringify(sortedContacts));
      setMobileContacts(sortedContacts);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
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
