import React, { useCallback, useState } from 'react';

import { useMyEvent } from '../../../../hooks/myEvent';

import BackButton from '../../../../components/BackButton';
import MainMenu from '../../components/MainMenu';
import NewGuestForm from '../../components/NewGuestForm';

import {
  Container,
  Header,
  EventName,
  Body,
  DashboardButton,
} from './styles';
import GuestsSection from '../../components/GuestsSection';

const MyEvent: React.FC = () => {
  const { selectedEvent, currentSection, selectEventSection } = useMyEvent();
  const [newGuestForm, setNewGuestForm] = useState(false);

  const handleNewGuestForm = useCallback((e: boolean) => {
    setNewGuestForm(e);
  }, []);

  return (
    <>
      {newGuestForm && (
        <NewGuestForm closeWindow={() => handleNewGuestForm(false)} />
      )}
      <Container>
        <Header>
          <BackButton />
          <DashboardButton onPress={() => selectEventSection('Dashboard')}>
            <EventName>{selectedEvent.name}</EventName>
          </DashboardButton>
        </Header>
        <Body>
          <MainMenu />
          {currentSection === 'Guests' && (
            <GuestsSection
              handleNewGuestForm={() => handleNewGuestForm(true)}
            />
          )}
        </Body>
      </Container>
    </>
  );
};

export default MyEvent;
