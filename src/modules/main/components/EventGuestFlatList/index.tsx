import React from 'react';
import { useEvent } from '../../../../hooks/event';
import { EventWePlanGuestButton } from '../EventWePlanGuestButton';

import { Container } from './styles';

export function EventGuestFlatList() {
  const { eventsAsGuest } = useEvent();
  return (
    <Container
      data={eventsAsGuest}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <EventWePlanGuestButton
          key={item.id}
          guest={item}
        />
      )}
    />
  );
}
