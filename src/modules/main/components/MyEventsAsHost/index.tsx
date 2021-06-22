import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useEvent } from '../../../../hooks/event';
import { EventButton } from '../EventButton';

import {
  Container,
  Label,
  LabelUnderline,
  EventContainer,
} from './styles';

const MyEventsAsHost: React.FC = () => {
  const navigation = useNavigation();
  const { eventsAsOwner } = useEvent();

  return (
    <Container>
      <Label>Eventos como Anfitrião</Label>
      <LabelUnderline />
      {eventsAsOwner
        && eventsAsOwner.length > 0
        && (
          <EventContainer
            data={eventsAsOwner}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventButton
                key={item.id}
                event={item.event}
              />
            )}
          />
        )}
    </Container>
  );
};

export default MyEventsAsHost;
