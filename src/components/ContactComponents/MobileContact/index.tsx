import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { Contact } from 'react-native-contacts';
import theme from '../../../global/styles/theme';
import { useUserContacts } from '../../../hooks/userContacts';

import {
  Container,
  Name,
  Button,
  Icon,
} from './styles';

interface IProps {
  fullSelection: boolean;
  contact: Contact;
}

export function MobileContact({ contact, fullSelection }: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    selectedMobileContacts,
    handleSelectedMobileContacts,
  } = useUserContacts();

  const [loading, setLoading] = useState(false);

  const isSelected = useMemo(() => {
    const findContact = selectedMobileContacts.find(thisContact =>
      thisContact.recordID === contact.recordID);
    return findContact === undefined ? false : !!findContact;
  }, [selectedMobileContacts]);

  const inActive = useMemo(() => {
    if (fullSelection && !isSelected) return true;
    false;
  }, [fullSelection, isSelected]);

  function handleSelectContact() {
    if (inActive) return;
    try {
      setLoading(true);
      handleSelectedMobileContacts(contact);
    } catch {
      throw new Error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      onPress={handleSelectContact}
    >
      <Name>{contact.givenName}   {contact.familyName}</Name>
      {!inActive && (
        <Button onPress={handleSelectContact}>
          {loading ? (
            <Icon isSelected={false} name="loader" />
          ) : isSelected ? (
            <Icon isSelected={true} name="check-square" />
          ) : (
            <Icon isSelected={false} name="square" />
          )}
        </Button>
      )}
    </Container>
  );
}
