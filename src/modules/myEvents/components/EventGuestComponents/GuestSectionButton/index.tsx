import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import IEventGuestDTO from '../../../../../dtos/IEventGuestDTO';
import { useAuth } from '../../../../../hooks/auth';
import { useMyEvent } from '../../../../../hooks/myEvent';

import {
  Container,
  GoToGuestButton,
  GuestConfirmationButton,
  GuestIndex,
  GuestNameContainer,
  GuestName,
} from './styles';
import theme from '../../../../../global/styles/theme';
import api from '../../../../../services/api';

interface IProps {
  index?: number;
  guest: IEventGuestDTO;
}

const GuestSectionButton: React.FC<IProps> = ({
  guest,
  index,
}) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { selectGuest, getEventGuests } = useMyEvent();

  const [loading, setLoading] = useState(false);

  const navigateToGuest = useCallback(() => {
    selectGuest(guest);
    navigation.navigate('EventGuest');
  }, [navigation, selectGuest, guest]);

  const handleEditGuestConfirmation = useCallback(async () => {
    if (user.id !== guest.host_id) return;
    try {
      setLoading(true);
      await api.put(`events/${guest.event_id}/guests/${guest.id}`, {
        first_name: guest.first_name,
        last_name: guest.last_name,
        description: guest.description,
        confirmed: !guest.confirmed,
      });
      await getEventGuests(guest.event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }, [guest, user, getEventGuests]);

  return (
    <Container isMine={guest.host_id === user.id}>
      <GoToGuestButton onPress={navigateToGuest}>
        {index && <GuestIndex>{index}</GuestIndex>}
        <GuestNameContainer>
          <GuestName isMine={guest.host_id === user.id}>
            {guest.first_name}
            {' '}
            {guest.last_name}
          </GuestName>
          {guest.weplanGuest && guest.weplanGuest.id && (
            <Icon color={theme.color.primary} name="user" size={30} />
          )}
          {guest.host_id === user.id && (
            <Icon color={theme.color.title} name="edit-2" size={24} />
          )}
        </GuestNameContainer>
      </GoToGuestButton>
      {loading ? (
        <Icon color={theme.color.text5} name="loader" size={30} />
      ) : (
        <GuestConfirmationButton onPress={handleEditGuestConfirmation}>
          {guest.host_id === user.id && guest.confirmed ? (
            <Icon color={theme.color.success_light} name="check-square" size={30} />
          ) : (
            <Icon color={theme.color.atention_light} name="square" size={30} />
          )}
        </GuestConfirmationButton>
      )}
    </Container>
  );
};

export default GuestSectionButton;
