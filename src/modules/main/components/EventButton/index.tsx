import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { DeleteButton } from '../../../../components/DeleteButton';

import IEventDTO from '../../../../dtos/IEventDTO';
import theme from '../../../../global/styles/theme';
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
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    handleSelectedEvent,
    handleDeleteEventConfirmationWindow,
  } = useMyEvent();

  const navigateToMyEvent = useCallback(() => {
    navigation.navigate('MyEvent');
  }, [navigation]);

  const selectMyEvent = useCallback(async () => {
    await handleSelectedEvent(event);
    navigateToMyEvent();
  }, [handleSelectedEvent, navigateToMyEvent, event]);

  async function handleDeleteEvent(): Promise<void> {
    await handleSelectedEvent(event);
    handleDeleteEventConfirmationWindow();
  }

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 8,
      }}
      onPress={() => selectMyEvent()}
    >
      <DeleteButton handleDelete={handleDeleteEvent} top="4%" right="1%" />
      <EventDate>
        {formatOnlyTime(String(event.date))}
        {" "}-{" "}
        {formatOnlyDateShort(String(event.date))}
      </EventDate>
      <Name>
        {event.name}
      </Name>
      <DateText>
        Criado em: {formatOnlyTime(String(event.created_at))}
        {" "}-{" "}
        {formatOnlyDateShort(String(event.created_at))}
      </DateText>
    </Container>
  );
}
