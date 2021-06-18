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

const EventGuest: React.FC = () => {
  const { selectedGuest, editGuestConfirmation } = useMyEvent();
  const [editGuestNameWindow, setEditGuestNameWindow] = useState(false);
  const [editGuestDescriptionWindow, setEditGuestDescriptionWindow] = useState(false);

  const handleEditGuestConfirmation = useCallback(() => {
    editGuestConfirmation(selectedGuest);
  }, [editGuestConfirmation, selectedGuest]);

  const handleEditGuestNameWindow = useCallback((e: boolean) => {
    setEditGuestNameWindow(e);
  }, []);

  const handleEditGuestDescriptionWindow = useCallback((e: boolean) => {
    setEditGuestDescriptionWindow(e);
  }, []);

  return (
    <Container>
      {editGuestNameWindow && (
        <EditGuestName closeWindow={() => handleEditGuestNameWindow(false)} />
      )}
      {editGuestDescriptionWindow && (
        <EditGuestDescription closeWindow={() => handleEditGuestDescriptionWindow(false)} />
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
          <ConfirmationButtonText isConfirmed={selectedGuest.confirmed}>
            {selectedGuest.confirmed ? 'Confirmado' : 'Não Confirmado'}
          </ConfirmationButtonText>
        </ConfirmationButton>
      </Body>
    </Container>
  );
};

export default EventGuest;
