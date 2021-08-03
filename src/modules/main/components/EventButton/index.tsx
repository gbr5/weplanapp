import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import IEventDTO from '../../../../dtos/IEventDTO';
import { useMyEvent } from '../../../../hooks/myEvent';
import formatOnlyDateShort from '../../../../utils/formatOnlyDateShort';
import formatOnlyTime from '../../../../utils/formatOnlyTime';
import {
  Container,
  Name,
  DateText,
  EventDate,
} from './styles';

interface IProps {
  event: IEventDTO;
}

export function EventButton({
  event,
}: IProps): JSX.Element {
  const navigation = useNavigation();
  const { selectEvent } = useMyEvent();

  const navigateToMyEvent = useCallback(() => {
    navigation.navigate('MyEvent');
  }, [navigation]);

  const selectMyEvent = useCallback(() => {
    selectEvent(event);
    navigateToMyEvent();
  }, [selectEvent, navigateToMyEvent, event]);

  return (
    <Container onPress={() => selectMyEvent()}>
      <EventDate>{formatOnlyTime(String(event.date))} - {formatOnlyDateShort(String(event.date))}</EventDate>
      <Name>
        {event.name}
      </Name>
      <DateText>Criado em: {formatOnlyTime(String(event.created_at))} -  {formatOnlyDateShort(String(event.created_at))}</DateText>
    </Container>
  );
}
