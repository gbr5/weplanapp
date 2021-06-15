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

const MyEventsAsMember: React.FC = () => {
  const { eventsAsMember } = useEvent();
  return (
    <Container>
      <Label>Eventos como Membro</Label>
      <LabelUnderline />
      <EventContainer>
        {
          eventsAsMember
          && eventsAsMember.length > 0
            && eventsAsMember.map((event) => (
              <EventButton key={event.id}>
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

export default MyEventsAsMember;
