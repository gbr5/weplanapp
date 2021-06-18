import React, { useCallback, useState } from 'react';

import { useMyEvent } from '../../../../hooks/myEvent';

import MainMenu from '../../components/MainMenu';
import NewGuestForm from '../../components/NewGuestForm';
import PageHeader from '../../../../components/PageHeader';

import {
  Container,
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
        <PageHeader>
          <DashboardButton onPress={() => selectEventSection('Dashboard')}>
            <EventName>{selectedEvent.name}</EventName>
          </DashboardButton>
        </PageHeader>
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
