import React, { useState } from 'react';
import { Linking } from 'react-native';
import InlineFormField from '../../../../../components/InlineFormField';
import { ContactLink } from '../../../../../components/ContactLink';
import IGuestContactDTO from '../../../../../dtos/IGuestContactDTO';
import theme from '../../../../../global/styles/theme';
import { useEventGuests } from '../../../../../hooks/eventGuests';

import { ContactInfo, Container, ContainerButton, ContactType } from './styles';

interface IProps {
  guestContact: IGuestContactDTO;
}

const GuestContact: React.FC<IProps> = ({ guestContact }) => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { updateGuestContact } = useEventGuests();

  const [editContact, setEditContact] = useState(false);

  function handleEditContact() {
    setEditContact(!editContact);
  }

  async function handleUpdateContact(contact_info: string) {
    await updateGuestContact({
      ...guestContact,
      contact_info,
    });
  }

  return (
    editContact ? (
      <Container
        style={{
          elevation: 5,
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
      >
        <ContactLink
          type={guestContact.contact_type}
          contact={guestContact.contact_info}
        />
        <InlineFormField
          defaultValue={guestContact.contact_info}
          placeholder={guestContact.contact_info}
          handleOnSubmit={handleUpdateContact}
          closeComponent={handleEditContact}
        />
      </Container>
    ) : (
      <ContainerButton
        style={{
          elevation: 5,
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
        onPress={handleEditContact}
      >
        <ContactType>{guestContact.contact_type}</ContactType>
        <ContactInfo>{guestContact.contact_info}</ContactInfo>
      </ContainerButton>
    )
  );
};

export default GuestContact;
