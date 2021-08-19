import React, { useMemo, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';

import IUserDTO from '../../../dtos/IUserDTO';
import theme from '../../../global/styles/theme';
import { useFriends } from '../../../hooks/friends';
import profilePlaceholder from '../../../assets/profilePlaceholder.jpeg';

import {
  Container,
  Name,
  Avatar,
  FriendButton,
  FriendButtonText,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import IFriendDTO from '../../../dtos/IFriendDTO';
import ShortConfirmationWindow from '../../ShortConfirmationWindow';
import { UserButtonInfo } from '../UserButtonInfo';

interface IProps {
  user: IUserDTO;
}

export function SearchUserButton({ user }: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    friends,
    requestFriendship,
    deleteFriend,
    handleDeleteFriendWindow,
    handleSelectedFriend,
    selectedFriend,
  } = useFriends();

  const [loading, setLoading] = useState(false);

  function handleConfirmDeleteFriendWindow(data: IFriendDTO) {
    handleSelectedFriend(data);
    handleDeleteFriendWindow();
  }


  const friend = useMemo(() => {
    const selectedFriend = friends.find(friend => friend.friend_id === user.id);
    return selectedFriend;
  }, [friends]);

  const isFriend = useMemo(() => {
    return friend ? friend.isConfirmed : false;
  }, [friend]);

  const friendshipRequested = useMemo(() => {
    return friend ? !friend.isConfirmed : false;
  }, [friend]);

  const friendText = useMemo(() => {
    if (isFriend) return 'Amigo';
    return friendshipRequested ? 'Solicitado' : 'Solicitar';
  }, [isFriend, friendshipRequested]);

  async function handleRequest() {
    if (friend) {
      if (isFriend) return handleConfirmDeleteFriendWindow(friend);
      try {
        setLoading(true);
        await deleteFriend(friend.id);
      } catch {
        throw new Error;
      } finally {
        return setLoading(false);
      }
    }
    try {
      setLoading(true);
      await requestFriendship(user.id);
    } catch {
      throw new Error;
    } finally {
      return setLoading(false);
    }
  }

  function handleUserInfo() {
    if (!friend) return;
    if (selectedFriend.id === friend.id)
      return handleSelectedFriend({} as IFriendDTO);
    handleSelectedFriend(friend);
  }

  return (
    <>
      <Container
        friendshipRequested={friendshipRequested}
        isFriend={isFriend}
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
        onPress={() => handleUserInfo()}
      >
        <Avatar
          source={!user.avatar_url
            ? profilePlaceholder
            : { uri: user.avatar_url }
          }
        />
        <Name>{user.name}</Name>
        {loading ? (
          <Feather name="loader" size={RFValue(20)} />
        ) : (
          <FriendButton
            onPress={handleRequest}
            friendshipRequested={friendshipRequested}
            isFriend={isFriend}
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
            }}
          >
            <FriendButtonText>{friendText}</FriendButtonText>
          </FriendButton>
        )}
      </Container>
      {friend && friend.isConfirmed && selectedFriend.id === friend.id && <UserButtonInfo />}
    </>
  );
}
