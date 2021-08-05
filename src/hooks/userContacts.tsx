import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { getAll, Contact } from 'react-native-contacts';

interface UserContactsContextType {
  mobileContacts: Contact[];
  selectedMobileContacts: Contact[];
  selectMobileContactsWindow: boolean;
  getUserContacts: () => Promise<void>;
  handleResetSelectedMobileContacts: () => void;
  handleSelectMobileContactsWindow: (data: boolean) => void;
  handleSelectedMobileContacts: (data: Contact) => void;
}

const UserContactsContext = createContext({} as UserContactsContextType);

const UserContactsProvider: React.FC = ({ children }) => {
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

  async function getUserContacts() {
    try {
      const storedContacts = await AsyncStorage.getItem('@WP-App:mobile-contacts');
      if (storedContacts) {
        const parsedContacts = JSON.parse(storedContacts);
        return setMobileContacts(parsedContacts);
      }
      const contacts = await getAll();
      const sortedContacts = contacts.sort((a, b) => {
        if (a.givenName.toUpperCase() > b.givenName.toUpperCase()) return 1;
        if (a.givenName.toUpperCase() < b.givenName.toUpperCase()) return -1;
        return 0;
      });

      await AsyncStorage.setItem('@WP-App:mobile-contacts', JSON.stringify(sortedContacts));
      setMobileContacts(sortedContacts);
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <UserContactsContext.Provider
      value={{
        getUserContacts,
        handleSelectMobileContactsWindow,
        handleSelectedMobileContacts,
        handleResetSelectedMobileContacts,
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
