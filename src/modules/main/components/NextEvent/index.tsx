import React from 'react';

import theme from '../../../../global/styles/theme';
import { useEvent } from '../../../../hooks/event';
import { EventButton } from '../EventButton';

import {
  Container,
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
        elevation: 20,
      }}
    >
      <Label>Próximo Evento</Label>
      <LabelUnderline />
      {
        nextEvent && nextEvent.id ? (
          <EventButton
            key={nextEvent.id}
            event={nextEvent}
          />
        ) : (
          <Name>-</Name>
        )
      }
    </Container>
  );
};

export default NextEvent;
