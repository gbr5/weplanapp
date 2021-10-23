import React from 'react';
import { useEvent } from '../../../../hooks/event';
import { EventButton } from '../EventButton';

import { Container } from './styles';

export function EventMemberFlatList() {
  const { eventsAsMember } = useEvent();
  return (
    <Container
      data={eventsAsMember}
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
