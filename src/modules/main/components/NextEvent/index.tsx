import React from 'react';
import theme from '../../../../global/styles/theme';
import { useEvent } from '../../../../hooks/event';
import formatDateToString from '../../../../utils/formatDateToString';
import { EventButton } from '../EventButton';

import {
  Container,
  Date,
  Label,
  Name,
  LabelUnderline,
} from './styles';

const NextEvent: React.FC = () => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;

  const { nextEvent } = useEvent();

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
    >
      <Label>Próximo Evento</Label>
      <LabelUnderline />
      {/* <Name>
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
      </Date> */}
      {
        nextEvent && nextEvent.event ? (
          <EventButton
            key={nextEvent.event.id}
            event={nextEvent.event}
          />
        ) : (
          <Name>-</Name>
        )
      }
    </Container>
  );
};

export default NextEvent;
