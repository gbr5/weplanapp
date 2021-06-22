import React from 'react';
import { useEvent } from '../../../../hooks/event';
import { EventButton } from '../EventButton';

import {
  Container,
  Label,
  LabelUnderline,
  EventContainer,
} from './styles';

const MyEventsAsMember: React.FC = () => {
  const { eventsAsMember } = useEvent();

  return (
    <Container>
      <Label>Eventos como Membro</Label>
      <LabelUnderline />
      {
        eventsAsMember
        && eventsAsMember.length > 0 && (
          <EventContainer
            data={eventsAsMember}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventButton
                key={item.id}
                event={item.event}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
    </Container>
  );
};

export default MyEventsAsMember;
