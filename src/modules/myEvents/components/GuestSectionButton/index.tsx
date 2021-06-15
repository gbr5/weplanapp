import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import IEventGuestDTO from '../../../../dtos/IEventGuestDTO';
import { useAuth } from '../../../../hooks/auth';

import {
  Container,
  GoToGuestButton,
  GuestConfirmationButton,
  GuestIndex,
  GuestName,
} from './styles';

interface IProps {
  index: number;
  guest: IEventGuestDTO;
}

const GuestSectionButton: React.FC<IProps> = ({
  guest,
  index,
}) => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const navigateToGuest = useCallback(() => {
    navigation.navigate('');
  }, [navigation]);

  return (
    <Container isMine={guest.host_id === user.id}>
      <GoToGuestButton>
        <GuestIndex>{index}</GuestIndex>
        <GuestName isMine={guest.host_id === user.id}>
          {guest.first_name}
          {' '}
          {guest.last_name}
        </GuestName>
        {guest.weplanGuest && guest.weplanGuest.id && (
          <Icon name="user" size={30} />
        )}
        {guest.host_id === user.id && (
          <Icon name="edit-2" size={30} />
        )}
      </GoToGuestButton>
      <GuestConfirmationButton>
        {guest.confirmed ? (
          <Icon name="check-square" size={30} />
        ) : (
          <Icon name="square" size={30} />
        )}
      </GuestConfirmationButton>
    </Container>
  );
};

export default GuestSectionButton;
