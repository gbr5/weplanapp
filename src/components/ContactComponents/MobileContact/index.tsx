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
  contact: Contact;
}

export function MobileContact({ contact }: IProps) {
  const {
    elevation,
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

  function handleSelectContact() {
    try {
      setLoading(true);
      handleSelectedMobileContacts(contact);
    } catch(err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  const isSelected = useMemo(() => {
    const findContact = selectedMobileContacts.find(thisContact =>
      thisContact.recordID === contact.recordID);
    return findContact === undefined ? false : !!findContact;
  }, [selectedMobileContacts]);

  return (
    <Container
      style={{
        elevation,
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      onPress={handleSelectContact}
    >
      <Name>{contact.givenName}   {contact.familyName}</Name>
      <Button onPress={handleSelectContact}>
        {loading ? (
          <Icon isSelected={false} name="loader" />
        ) : isSelected ? (
          <Icon isSelected={true} name="check-square" />
        ) : (
          <Icon isSelected={false} name="square" />
        )}
      </Button>
    </Container>
  );
}
