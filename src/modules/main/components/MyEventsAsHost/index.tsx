import React from 'react';
import { useEvent } from '../../../../hooks/event';
import formatDateToString from '../../../../utils/formatDateToString';

import {
  Container,
  Date,
  Label,
  Name,
  LabelUnderline,
  EventButton,
  EventContainer,
} from './styles';

const MyEventsAsHost: React.FC = () => {
  const { eventsAsOwner } = useEvent();
  return (
    <Container>
      <Label>Eventos como Anfitrião</Label>
      <LabelUnderline />
      <EventContainer>
        {
          eventsAsOwner
          && eventsAsOwner.length > 0
            && eventsAsOwner.map((event) => (
              <EventButton>
                <Name>
                  {event.event.name}
                </Name>
                <Date>{formatDateToString(String(event.event.date))}</Date>
              </EventButton>
            ))
        }
      </EventContainer>
    </Container>
  );
};

export default MyEventsAsHost;
