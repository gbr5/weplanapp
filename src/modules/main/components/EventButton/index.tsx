import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import IEventDTO from '../../../../dtos/IEventDTO';
import { useMyEvent } from '../../../../hooks/myEvent';
import formatDateToString from '../../../../utils/formatDateToString';
import {
  Container,
  Name,
  Date,
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
      <Name>
        {event.name}
      </Name>
      <Date>{formatDateToString(String(event.date))}</Date>
    </Container>
  );
}
