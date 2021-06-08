import React, { useEffect } from 'react';
import { useEvent } from '../../../../hooks/event';
import { Container, Title } from './styles';

const MyEventsButton: React.FC = () => {
  const { getNextEvent, nextEvent } = useEvent();

  useEffect(() => {
    getNextEvent();
  }, [getNextEvent]);

  return (
    <Container>
      <Title>Meus Eventos</Title>
      <Title>
        Next Event:
        {' '}
        {nextEvent && nextEvent.event && nextEvent.event.name}
      </Title>
    </Container>
  );
};

export default MyEventsButton;
