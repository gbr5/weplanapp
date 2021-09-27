import React, { useState, useMemo } from 'react';

import IEventGuestDTO from '../../../../../dtos/IEventGuestDTO';
import theme from '../../../../../global/styles/theme';
import { useAuth } from '../../../../../hooks/auth';
import { useEventGuests } from '../../../../../hooks/eventGuests';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { EventGuestButtonInfo } from '../EventGuestButtonInfo';

import {
  OverContainer,
  Container,
  Name,
  ConfirmGuestButton,
  GuestInfoButton,
  Index,
  Icon,
} from './styles';

interface IProps {
  guest: IEventGuestDTO;
  index: number;
}

export function EventGuestButton({ guest, index }: IProps): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { user } = useAuth();
  const { selectedEventGuest, selectEventGuest } = useEventVariables();
  const { editGuest } = useEventGuests();

  const [loading, setLoading] = useState(false);

  const isMine = useMemo(() => guest.host_id === user.id, [guest, user]);
  const isActive = useMemo(() => guest.id === selectedEventGuest.id, [
    guest,
    selectedEventGuest,
  ]);

  function handleSelectGuest(): void {
    if (
      (selectedEventGuest && !selectedEventGuest.id) ||
      selectedEventGuest.id !== guest.id
    )
      return selectEventGuest(guest);
    return selectEventGuest({} as IEventGuestDTO);
  }

  async function handleEditGuestConfirmation(): Promise<void> {
    if (isMine) {
      try {
        setLoading(true);
        await editGuest({
          ...guest,
          confirmed: !guest.confirmed,
        });
      } catch {
        throw new Error();
      } finally {
        setLoading(false);
      }
    }
  }

  const weplanGuest = useMemo(() => {
    if (
      guest.weplanUser &&
      !!guest.weplanGuest &&
      !!guest.weplanGuest.weplanUserGuest
    ) {
      const { personInfo } = guest.weplanGuest.weplanUserGuest;
      return personInfo
        ? `${personInfo.first_name}  ${personInfo.last_name}`
        : guest.weplanGuest.weplanUserGuest.name;
    }
    return undefined;
  }, [guest]);

  const guestName = useMemo(
    () => weplanGuest || `${guest.first_name} ${guest.last_name}`,
    [weplanGuest, guest],
  );

  return (
    <OverContainer style={{
      zIndex: isActive ? 3 : 1,
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
      elevation: 8,
    }}>
      <Container
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 8,
          zIndex: isActive ? 3 : 1
        }}
        isActive={isMine}
      >
        <GuestInfoButton onPress={handleSelectGuest}>
          <Index>{index}</Index>
          <Name>{guestName}</Name>
        </GuestInfoButton>

        {!!weplanGuest && (
          <ConfirmGuestButton>
            <Icon name="user" />
          </ConfirmGuestButton>
        )}
        {loading ? (
          <ConfirmGuestButton>
            <Icon name="loader" />
          </ConfirmGuestButton>
        ) : (
          <ConfirmGuestButton onPress={handleEditGuestConfirmation}>
            {guest.confirmed ? (
              <Icon name="check-square" />
            ) : (
              <Icon name="square" />
            )}
          </ConfirmGuestButton>
        )}
      </Container>
      {isActive && <EventGuestButtonInfo />}
    </OverContainer>
  );
}
