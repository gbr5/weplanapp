import React, { useCallback, useEffect, useState } from 'react';
import { useEvent } from '../../../../hooks/event';
import CreateEvent from '../../../myEvents/pages/CreateEvent';

import {
  Container,
  TitleSection,
  Title,
  AddEventButton,
  AddIcon,
  NextEventName,
  NextEvent,
} from './styles';

const MyEventsSection: React.FC = () => {
  const { getNextEvent, nextEvent } = useEvent();
  const [createEventWindow, setCreateEventWindow] = useState(false);

  useEffect(() => {
    getNextEvent();
  }, [getNextEvent]);

  const handleCreateEventWindow = useCallback((props: boolean) => {
    setCreateEventWindow(props);
  }, []);

  return (
    <Container>
      {createEventWindow && (
        <CreateEvent handleCloseWindow={() => handleCreateEventWindow(false)} />
      )}
      <TitleSection>
        <Title>Meus Eventos</Title>
        <AddEventButton onPress={() => handleCreateEventWindow(true)}>
          <AddIcon name="plus" size={40} />
        </AddEventButton>
      </TitleSection>
      <NextEvent>
        <NextEventName>
          Next Event:
          {' '}
          {nextEvent && nextEvent.event && nextEvent.event.name}
        </NextEventName>
      </NextEvent>
    </Container>
  );
};

export default MyEventsSection;
