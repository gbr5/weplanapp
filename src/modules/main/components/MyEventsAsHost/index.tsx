import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useCallback } from 'react';
import IEventDTO from '../../../../dtos/IEventDTO';
import { useEvent } from '../../../../hooks/event';
import { useMyEvent } from '../../../../hooks/myEvent';
import formatDateToString from '../../../../utils/formatDateToString';

import {
  Container,
  Date,
  Label,
  Name,
  LabelUnderline,
  EventButton,
  EventContainer,
} from './styles';

const MyEventsAsHost: React.FC = () => {
  const navigation = useNavigation();
  const { eventsAsOwner } = useEvent();
  const { selectEvent } = useMyEvent();

  const navigateToMyEvent = useCallback(() => {
    navigation.navigate('MyEvent');
  }, [navigation]);

  const selectMyEvent = useCallback((event: IEventDTO) => {
    selectEvent(event);
    navigateToMyEvent();
  }, [selectEvent, navigateToMyEvent]);

  return (
    <Container>
      <Label>Eventos como Anfitrião</Label>
      <LabelUnderline />
      <EventContainer>
        {
          eventsAsOwner
          && eventsAsOwner.length > 0
            && eventsAsOwner.map((event) => (
              <EventButton key={event.id} onPress={() => selectMyEvent(event.event)}>
                <Name>
                  {event.event.name}
                </Name>
                <Date>{formatDateToString(String(event.event.date))}</Date>
              </EventButton>
            ))
        }
      </EventContainer>
    </Container>
  );
};

export default MyEventsAsHost;
