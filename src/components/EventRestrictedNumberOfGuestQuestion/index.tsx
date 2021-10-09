import React, { useState } from 'react';
import { useEventVariables } from '../../hooks/eventVariables';
import { useMyEvent } from '../../hooks/myEvent';
import { CheckBoxButton } from '../CheckBoxButton';

import { Container, Title } from './styles';

export function EventRestrictedNumberOfGuestQuestion() {
  const { editEvent } = useMyEvent();
  const { selectedEvent } = useEventVariables();

  const [loading, setLoading] = useState(false);

  async function handleSetEventNumberOfGuests() {
    try {
      setLoading(true);
      await editEvent({
        ...selectedEvent,
        isNumberOfGuestsRestricted: !selectedEvent.isNumberOfGuestsRestricted,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Container>
      <Title>
        Número de convidados restrito
      </Title>
      <CheckBoxButton
        handleIsActive={handleSetEventNumberOfGuests}
        isActive={selectedEvent.isNumberOfGuestsRestricted}
        loading={loading}
      />
    </Container>
  );
}
