import React from 'react';
import { useEvent } from '../../../../hooks/event';
import { EventButton } from '../EventButton';

import { Container } from './styles';

export function EventOwnerFlatList() {
  const { eventsAsOwner } = useEvent();
  return (
    <Container
      data={eventsAsOwner}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <EventButton
          key={item.id}
          event={item.event}
        />
      )}
    />
  );
}
