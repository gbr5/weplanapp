import React, { useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';

import { DeleteButton } from '../../../../components/DeleteButton';
import IEventGuestDTO from '../../../../dtos/IEventGuestDTO';
import theme from '../../../../global/styles/theme';
import { useEvent } from '../../../../hooks/event';
import { useEventVariables } from '../../../../hooks/eventVariables';
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
  guest: IEventGuestDTO;
}

export function EventWePlanGuestButton({
  guest,
}: IProps): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { handleEventAsGuestConfirmationWindow } = useEvent();
  const {
    selectEvent,
    selectEventGuest,
  } = useEventVariables();
  const {
    handleSelectedEvent,
    handleDeleteEventConfirmationWindow,
  } = useMyEvent();

  const iconSize = 24;

  const openEventAsGuestConfirmationWindow = useCallback(async () => {
    handleEventAsGuestConfirmationWindow();
    selectEventGuest(guest);
  }, [handleSelectedEvent, guest]);

  async function handleDeleteEvent(): Promise<void> {
    selectEvent(guest.weplanGuest.event);
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
      onPress={() => openEventAsGuestConfirmationWindow()}
    >
      <DeleteButton handleDelete={handleDeleteEvent} top="4%" right="1%" />
      <EventDate>
        {formatOnlyTime(String(guest.weplanGuest.event.date))}
        {" "}-{" "}
        {formatOnlyDateShort(String(guest.weplanGuest.event.date))}
      </EventDate>
      <Name>
        {guest.weplanGuest.event.name}
      </Name>
      {guest.confirmed ? (
        <DateText>
          Confirmado <Feather size={iconSize} name="check-square" />
        </DateText>
      ) : (
        <DateText>
          A Confirmar <Feather size={iconSize} name="square" />
        </DateText>
      )}
    </Container>
  );
}
