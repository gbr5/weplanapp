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
  } = useFriends();

  const [loading, setLoading] = useState(false);
  const [confirmDeleteFriendWindow, setConfirmDeleteFriendWindow] = useState(false);

  function handleConfirmDeleteFriendWindow(data: IFriendDTO) {
    handleSelectedFriend(data);
    handleDeleteFriendWindow();
  }

  async function handleDeleteFriend() {
    if (friend) {
      await deleteFriend(friend.id);
    }
  }

  const friend = useMemo(() => {
    return friends.find(friend => friend.friend_id === user.id);
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

  return (
    <Container
      friendshipRequested={friendshipRequested}
      isFriend={isFriend}
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      onPress={handleRequest}
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
  );
}
