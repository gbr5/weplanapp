import React from 'react';

import { useMyEvent } from '../../../../hooks/myEvent';

import BackButton from '../../../../components/BackButton';
import MainMenu from '../../components/MainMenu';

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

  return (
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
          <GuestsSection />
        )}
      </Body>
    </Container>
  );
};

export default MyEvent;
