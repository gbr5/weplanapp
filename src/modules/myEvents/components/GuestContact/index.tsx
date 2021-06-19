import React from 'react';
import { useCallback } from 'react';
import IGuestContactDTO from '../../../../dtos/IGuestContactDTO';

import { ContactInfo, Container, ContactType } from './styles';

interface IProps {
  guestContact: IGuestContactDTO;
  openGuestContactWindow: (data: IGuestContactDTO) => void;
}

const GuestContact: React.FC<IProps> = ({ guestContact, openGuestContactWindow }) => {
  const handleGuestContactWindow = useCallback(() => {
    openGuestContactWindow(guestContact);
  }, [openGuestContactWindow, guestContact]);

  return (
    <Container onPress={handleGuestContactWindow}>
      <ContactType>{guestContact.contact_type}</ContactType>
      <ContactInfo>{guestContact.contact_info}</ContactInfo>
    </Container>
  );
};

export default GuestContact;
