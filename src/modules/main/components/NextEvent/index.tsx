import React from 'react';
import { useEvent } from '../../../../hooks/event';
import formatDateToString from '../../../../utils/formatDateToString';

import {
  Container,
  Date,
  Label,
  Name,
  LabelUnderline,
} from './styles';

const NextEvent: React.FC = () => {
  const { nextEvent } = useEvent();
  return (
    <Container>
      <Label>Próximo Evento</Label>
      <LabelUnderline />
      <Name>
        {
          nextEvent
          && nextEvent.event
          && nextEvent.event.name
            ? nextEvent.event.name
            : '-'
        }
      </Name>
      <Date>
        {
          nextEvent
          && nextEvent.event
          && nextEvent.event.date
            ? formatDateToString(String(nextEvent.event.date))
            : '-'
        }
      </Date>
    </Container>
  );
};

export default NextEvent;
