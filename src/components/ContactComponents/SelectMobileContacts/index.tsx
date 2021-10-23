import React, { useCallback, useState, useRef, useMemo } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { Contact } from 'react-native-contacts';
import Icon from 'react-native-vector-icons/Feather';

import theme from '../../../global/styles/theme';
import { useEventGuests } from '../../../hooks/eventGuests';
import { useUserContacts } from '../../../hooks/userContacts';

import Backdrop from '../../Backdrop';
import WindowContainer from '../../WindowContainer';
import { WindowHeader } from '../../WindowHeader';
import { MobileContact } from '../MobileContact';
import { FormButton } from '../../FormButton';

import {
  Container,
  ContactContainer,
  NumberOfContacts,
  CloseButton,
  CloseIcon,
  Input,
  InputContainer,
  SearchButton,
} from './styles';
import { useEventVariables } from '../../../hooks/eventVariables';
import { useAuth } from '../../../hooks/auth';
import { useMyEvent } from '../../../hooks/myEvent';

export function SelectMobileContacts() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.iconButtonShadow;
  const inputRef = useRef<TextInput>(null);
  const { user } = useAuth();
  const {
    selectedEvent,
    isOwner,
    eventOwners,
    eventMembers,
  } = useEventVariables();
  const {
    myNumberOfGuests,
  } = useMyEvent();
  const { createMultipleMobileGuests, handleNewGuestWindow } = useEventGuests();
  const {
    handleSelectMobileContactsWindow,
    mobileContacts,
    selectedMobileContacts,
    handleResetSelectedMobileContacts,
    loading,
  } = useUserContacts();

  const [isLoading, setIsLoading] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [fullSelection, setFullSelection] = useState(false);
  const [filterString, setFilterString] = useState<string | undefined>(undefined);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(mobileContacts);

  async function handleSubmit() {
    try {
      setIsLoading(true);
      await createMultipleMobileGuests(selectedMobileContacts);
    } catch {
      throw new Error;
    } finally {
      setIsLoading(false);
      setFilterString(undefined);
      setFilteredContacts([]);
      handleResetSelectedMobileContacts();
      handleSelectMobileContactsWindow(false);
      handleNewGuestWindow();
    }
  }

  const numberOfContacts = useMemo(() => {
    if (selectedEvent.isNumberOfGuestsRestricted) {
      const alreadySelected = myNumberOfGuests + selectedMobileContacts.length;
      let limit = '';
      if (isOwner) {
        const owner = eventOwners.find(item => item.userEventOwner.id === user.id);
        if (owner) {
          const isFull = owner.number_of_guests - alreadySelected;
          isFull <= 0 ? setFullSelection(true) : setFullSelection(false);
          limit = `${isFull}`;
        }
      } else {
        const member = eventMembers.find(item => item.userEventMember.id === user.id);
        if (member) {
          const isFull = member.number_of_guests - alreadySelected;
          isFull <= 0 ? setFullSelection(true) : setFullSelection(false);
          limit = `${isFull}`;
        }
      }
      const contacts = filteredContacts.length;
      const selected = selectedMobileContacts.length;
      return `${selected} / ${contacts}
      Você ainda pode selecionar ${limit} pessoas`;
    }
    const contacts = filteredContacts.length;
    const selected = selectedMobileContacts.length;
    return `${selected} / ${contacts}`;
  }, [filteredContacts, selectedMobileContacts]);

  function handleResetSearch() {
    setFilterString(undefined);
    inputRef.current && inputRef.current.clear();
    Keyboard.dismiss();
    setBackdrop(false);
    setFilteredContacts(mobileContacts);
  }

  function handleOffSearch() {
    Keyboard.dismiss();
    setBackdrop(false);
  }


  const handleLookForContact = useCallback((data: string) => {
    setFilterString(data);
    if (data === '') return setFilteredContacts(mobileContacts);
    setBackdrop(true);
    const findGuests = mobileContacts.filter(contact =>
      contact.givenName.toLowerCase().includes(data.toLowerCase())
      || contact.familyName.toLowerCase().includes(data.toLowerCase())
    );
    setFilteredContacts(findGuests);
  }, [mobileContacts])

  const isActive = useMemo(() => {
    return filterString && filterString !== '' ? true : false;
  },
  [filterString]);

  return (
    <WindowContainer
      closeWindow={() => handleSelectMobileContactsWindow(false)}
      zIndex={15}
      top="5%"
      left="2%"
      height="90%"
      width="96%"
    >
      <Container>
        <WindowHeader title="Contatos do Celular" />
        <NumberOfContacts>{numberOfContacts}</NumberOfContacts>
        {backdrop && (
          <Backdrop
            left="-10%"
            width="120%"
            zIndex={2}
            closeFunction={handleOffSearch}
          />
        )}
        <InputContainer
          style={{
            shadowColor: isActive ? theme.color.text1 : 'rgba(0,0,0,0)',
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          {filterString !== undefined && (
            <CloseButton
              style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
              }}
              onPress={handleResetSearch}
            >
              <CloseIcon name="x" />
            </CloseButton>
          )}
          <Input
            ref={inputRef}
            placeholderTextColor={theme.color.text1}
            placeholder="Filtrar por ..."
            onChangeText={(e) => handleLookForContact(e)}
          />
          <SearchButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
            }}
            onPress={handleOffSearch}
          >
            <Icon size={24} name="search" />
          </SearchButton>
        </InputContainer>

        {loading ? (
          <Icon color={theme.color.secondary} size={58} name="loader" />
        ) : (
            <ContactContainer
              data={filteredContacts}
              keyExtractor={(item) => item.recordID}
              renderItem={({ item }) => {
                return (
                  <MobileContact fullSelection={fullSelection} key={item.recordID} contact={item} />
                );
              }}
            />
           )}
      </Container>
      <FormButton
        loading={isLoading}
        handleSubmit={handleSubmit}
        text="Adicionar Contatos"
      />
    </WindowContainer>
  );
}
