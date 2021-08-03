import React, { useState } from 'react';
import { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useMyEvent } from '../../../../hooks/myEvent';
import { useEventGuests } from '../../../../hooks/eventGuests';

import PageHeader from '../../../../components/PageHeader';
import EditGuestName from '../../components/EventGuestComponents/EditGuestName';
import EditGuestDescription from '../../components/EventGuestComponents/EditGuestDescription';
import EditGuestContact from '../../components/EventGuestComponents/EditGuestContact';
import IGuestContactDTO from '../../../../dtos/IGuestContactDTO';
import GuestContactSection from '../../components/EventGuestComponents/GuestContactSection';
import CreateGuestContactWindow from '../../components/EventGuestComponents/CreateGuestContactWindow';

import {
  Container,
  Title,
  Body,
  InfoContainer,
  InfoLabel,
  InfoText,
  ConfirmationButton,
  ConfirmationButtonText,
} from './styles';

const EventGuest: React.FC = () => {
  const { selectedGuest } = useMyEvent();
  const {
    editGuest,
    loading,
    selectGuestContact,
    selectedGuestContact,
  } = useEventGuests();

  const [editGuestNameWindow, setEditGuestNameWindow] = useState(false);
  const [editGuestDescriptionWindow, setEditGuestDescriptionWindow] = useState(false);
  const [guestContactWindow, setGuestContactWindow] = useState(false);
  const [createContactWindow, setCreateContactWindow] = useState(false);

  const handleEditGuestConfirmation = useCallback(async () => {
    await editGuest({
      ...selectedGuest,
      confirmed: selectedGuest.confirmed,
    });
  }, [editGuest, selectedGuest]);
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
          <InfoText>
            {selectedGuest && selectedGuest.id && selectedGuest.host.name}
          </InfoText>
        </InfoContainer>
        <InfoContainer onPress={() => handleEditGuestNameWindow(true)}>
          <InfoLabel>Nome:</InfoLabel>
          <InfoText>
            {selectedGuest && selectedGuest.id && selectedGuest.first_name}
            {' '}
            {selectedGuest && selectedGuest.id && selectedGuest.last_name}
          </InfoText>
          <Icon size={30} name="edit-2" />
        </InfoContainer>
        <InfoContainer onPress={() => handleEditGuestDescriptionWindow(true)}>
          <InfoLabel>Descrição:</InfoLabel>
          <InfoText>
            {selectedGuest && selectedGuest.id && selectedGuest.description}
          </InfoText>
          <Icon size={30} name="edit-2" />
        </InfoContainer>
        <ConfirmationButton
          onPress={handleEditGuestConfirmation}
          isConfirmed={
            selectedGuest
            && !!selectedGuest.id
            && selectedGuest.confirmed
          }
        >
          {loading ? (
            <Icon name="loader" size={30} />
          ) : (
            <ConfirmationButtonText
              isConfirmed={
                selectedGuest
                && !selectedGuest.id
                && selectedGuest.confirmed
              }
            >
              {
                selectedGuest
                && !selectedGuest.id
                && selectedGuest.confirmed
                  ? 'Confirmado'
                  : 'Não Confirmado'
              }
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
