import React, { ReactElement } from 'react';

import {
  Container,
  Title,
  EventTypeButton,
  EventTypeButtonText,
} from './styles';

interface IProps {
  selectEventType: (type: string) => void;
  eventType: string;
}

export function SelectEventType({
  eventType,
  selectEventType,
}: IProps): JSX.Element {
  return (
    <Container>
      <Title>Selecione o tipo de evento</Title>
      <EventTypeButton
        onPress={() => selectEventType('Casamento')}
        isActive={eventType === 'Casamento'}
      >
        <EventTypeButtonText
          isActive={eventType === 'Casamento'}
        >
          Casamento
        </EventTypeButtonText>
      </EventTypeButton>
      <EventTypeButton
        onPress={() => selectEventType('Formatura')}
        isActive={eventType === 'Formatura'}
      >
        <EventTypeButtonText
          isActive={eventType === 'Formatura'}
        >
          Formatura
        </EventTypeButtonText>
      </EventTypeButton>
      <EventTypeButton
        onPress={() => selectEventType('Outros')}
        isActive={eventType === 'Outros'}
      >
        <EventTypeButtonText
          isActive={eventType === 'Outros'}
        >
          Outros
        </EventTypeButtonText>
      </EventTypeButton>
    </Container>
  );
}
