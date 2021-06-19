import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import IGuestContactDTO from '../../../../dtos/IGuestContactDTO';
import { useEventGuests } from '../../../../hooks/eventGuests';
import { useMyEvent } from '../../../../hooks/myEvent';
import GuestContact from '../GuestContact';

import {
  Container,
  ContactContainer,
  Title,
  TitleBorderBottom,
  AddContactButton,
} from './styles';

interface IProps {
  openContactWindow: () => void;
  openCreateContactWindow: () => void;
}

const GuestContactSection: React.FC<IProps> = ({
  openContactWindow,
  openCreateContactWindow,
}) => {
  const { selectedGuest } = useMyEvent();
  const { selectGuestContact } = useEventGuests();

  const handleSelectedContact = useCallback((data: IGuestContactDTO) => {
    selectGuestContact(data);
    openContactWindow();
  }, [openContactWindow, selectGuestContact]);

  return (
    <Container>
      <AddContactButton onPress={openCreateContactWindow}>
        <Icon name="plus" size={38} />
      </AddContactButton>
      <Title>Contatos</Title>
      <TitleBorderBottom />
      <ContactContainer>
        {selectedGuest
            && selectedGuest.contacts
            && selectedGuest.contacts.length > 0
            && selectedGuest.contacts.map((contact) => (
              <GuestContact
                guestContact={contact}
                openGuestContactWindow={
                  (data: IGuestContactDTO) => handleSelectedContact(data)
                }
                key={contact.id}
              />
            ))}
      </ContactContainer>
    </Container>
  );
};

export default GuestContactSection;
