import React, { useState } from 'react';
import { useEventVariables } from '../../hooks/eventVariables';
import { useMyEvent } from '../../hooks/myEvent';
import { CheckBoxButton } from '../CheckBoxButton';

import { Container, Title } from './styles';

export function EventPublishedQuestion() {
  const { editEvent } = useMyEvent();
  const { selectedEvent } = useEventVariables();

  const [loading, setLoading] = useState(false);

  async function handleSetEventNumberOfGuests() {
    try {
      setLoading(true);
      await editEvent({
        ...selectedEvent,
        isPublished: !selectedEvent.isPublished,
      });
    } catch (err: any | unknown) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Container>
      {selectedEvent.isPublished ? (
        <Title>
          Evento Publicado
        </Title>
      ) : (
        <Title>
          Publicar Evento
        </Title>
      )}
      <CheckBoxButton
        handleIsActive={handleSetEventNumberOfGuests}
        isActive={selectedEvent.isPublished}
        loading={loading}
      />
    </Container>
  );
}
