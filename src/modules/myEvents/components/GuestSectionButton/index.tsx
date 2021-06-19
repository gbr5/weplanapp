import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import IEventGuestDTO from '../../../../dtos/IEventGuestDTO';
import { useAuth } from '../../../../hooks/auth';
import { useMyEvent } from '../../../../hooks/myEvent';

import {
  Container,
  GoToGuestButton,
  GuestConfirmationButton,
  GuestIndex,
  GuestNameContainer,
  GuestName,
} from './styles';
import { useEventGuests } from '../../../../hooks/eventGuests';

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
  const { selectGuest, selectedGuest } = useMyEvent();
  const { editGuestConfirmation, loading } = useEventGuests();

  const navigateToGuest = useCallback(() => {
    selectGuest(guest);
    navigation.navigate('EventGuest');
  }, [navigation, selectGuest, guest]);

  const handleEditGuestConfirmation = useCallback(async () => {
    await editGuestConfirmation(guest);
  }, [guest, editGuestConfirmation]);

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
            <Icon name="user" size={30} />
          )}
          {guest.host_id === user.id && (
            <Icon name="edit-2" size={30} />
          )}
        </GuestNameContainer>
      </GoToGuestButton>
      {loading && selectedGuest.id === guest.id ? (
        <Icon name="loader" size={30} />
      ) : (
        <GuestConfirmationButton onPress={handleEditGuestConfirmation}>
          {guest.host_id === user.id && guest.confirmed ? (
            <Icon name="check-square" size={30} />
          ) : (
            <Icon name="square" size={30} />
          )}
        </GuestConfirmationButton>
      )}
    </Container>
  );
};

export default GuestSectionButton;
