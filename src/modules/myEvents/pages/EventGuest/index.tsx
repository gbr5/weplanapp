import React, { useState } from 'react';
import { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import PageHeader from '../../../../components/PageHeader';
import { useMyEvent } from '../../../../hooks/myEvent';

import EditGuestName from '../../components/EditGuestName';
import EditGuestDescription from '../../components/EditGuestDescription';

import {
  Container,
  Title,
  Body,
  InfoContainer,
  InfoLabel,
  GuestName,
  ConfirmationButton,
  ConfirmationButtonText,
} from './styles';
import { useEventGuests } from '../../../../hooks/eventGuests';
import EditGuestContact from '../../components/EditGuestContact';
import IGuestContactDTO from '../../../../dtos/IGuestContactDTO';
import GuestContactSection from '../../components/GuestContactSection';
import CreateGuestContactWindow from '../../components/CreateGuestContactWindow';

const EventGuest: React.FC = () => {
  const { selectedGuest } = useMyEvent();
  const {
    editGuestConfirmation,
    loading,
    selectGuestContact,
    selectedGuestContact,
  } = useEventGuests();
  const [editGuestNameWindow, setEditGuestNameWindow] = useState(false);
  const [editGuestDescriptionWindow, setEditGuestDescriptionWindow] = useState(false);
  const [guestContactWindow, setGuestContactWindow] = useState(false);
  const [createContactWindow, setCreateContactWindow] = useState(false);

  const handleEditGuestConfirmation = useCallback(() => {
    editGuestConfirmation(selectedGuest);
  }, [editGuestConfirmation, selectedGuest]);

  const handleEditGuestNameWindow = useCallback((e: boolean) => {
    setEditGuestNameWindow(e);
  }, []);

  const handleEditGuestDescriptionWindow = useCallback((e: boolean) => {
    setEditGuestDescriptionWindow(e);
  }, []);
  const openGuestContactWindow = useCallback(() => {
    setGuestContactWindow(true);
  }, []);
  const closeGuestContactWindow = useCallback(() => {
    setGuestContactWindow(false);
    selectGuestContact({} as IGuestContactDTO);
  }, [selectGuestContact]);

  const handleCreateContactWindow = useCallback((e: boolean) => {
    setCreateContactWindow(e);
  }, []);

  return (
    <Container>
      {editGuestNameWindow && (
        <EditGuestName closeWindow={() => handleEditGuestNameWindow(false)} />
      )}
      {editGuestDescriptionWindow && (
        <EditGuestDescription closeWindow={() => handleEditGuestDescriptionWindow(false)} />
      )}
      {guestContactWindow && selectedGuestContact && selectedGuestContact.id && (
        <EditGuestContact
          closeWindow={closeGuestContactWindow}
        />
      )}
      {createContactWindow && (
        <CreateGuestContactWindow
          closeWindow={() => handleCreateContactWindow(false)}
        />
      )}
      <PageHeader><Title>Convidado</Title></PageHeader>
      <Body>
        <InfoContainer>
          <InfoLabel>Anfitrião:</InfoLabel>
          <GuestName>
            {selectedGuest.host.name}
          </GuestName>
        </InfoContainer>
        <InfoContainer onPress={() => handleEditGuestNameWindow(true)}>
          <InfoLabel>Nome:</InfoLabel>
          <GuestName>
            {selectedGuest.first_name}
            {' '}
            {selectedGuest.last_name}
          </GuestName>
          <Icon size={30} name="edit-2" />
        </InfoContainer>
        <InfoContainer onPress={() => handleEditGuestDescriptionWindow(true)}>
          <InfoLabel>Descrição:</InfoLabel>
          <GuestName>
            {selectedGuest.description}
          </GuestName>
          <Icon size={30} name="edit-2" />
        </InfoContainer>
        <ConfirmationButton
          onPress={handleEditGuestConfirmation}
          isConfirmed={selectedGuest.confirmed}
        >
          {loading ? (
            <Icon name="loader" size={30} />
          ) : (
            <ConfirmationButtonText isConfirmed={selectedGuest.confirmed}>
              {selectedGuest.confirmed ? 'Confirmado' : 'Não Confirmado'}
            </ConfirmationButtonText>
          )}
        </ConfirmationButton>
        <GuestContactSection
          openContactWindow={openGuestContactWindow}
          openCreateContactWindow={() => handleCreateContactWindow(true)}
        />
      </Body>
    </Container>
  );
};

export default EventGuest;
