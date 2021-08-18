import React, { useMemo, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';

import IFriendDTO from '../../../../dtos/IFriendDTO';
import theme from '../../../../global/styles/theme';
import { useFriends } from '../../../../hooks/friends';
import profilePlaceholder from '../../../../assets/profilePlaceholder.jpeg';

import {
  Container,
  Name,
  Avatar,
  FriendButton,
  FriendButtonText,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
  friend: IFriendDTO;
}

export function FriendRequestButton({ friend }: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    updateFriend,
    deleteFriend,
    handleFriendRequestsWindow,
  } = useFriends();

  const [loading, setLoading] = useState(false);

  async function acceptRequest() {
    try {
      setLoading(true);
      await updateFriend(friend.id);
    } catch {
      throw new Error;
    } finally {
      setLoading(false);
    }
  }

  async function declineRequest() {
    try {
      setLoading(true);
      await deleteFriend(friend.id);
    } catch {
      throw new Error;
    } finally {
      setLoading(false);
      return handleFriendRequestsWindow();
    }
  }

  return (
    <Container
      friendshipRequested={false}
      isFriend={false}
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      onPress={acceptRequest}
    >
      <Avatar
        source={!friend.friend.avatar_url
          ? profilePlaceholder
          : { uri: friend.friend.avatar_url }
        }
      />
      <Name>{friend.friend.name}</Name>
      {loading ? (
        <Feather name="loader" size={RFValue(20)} />
      ) : (
        <>
          <FriendButton
            onPress={acceptRequest}
            friendshipRequested={false}
            isFriend={false}
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
            }}
          >
            <FriendButtonText>Aceitar</FriendButtonText>
          </FriendButton>
          <FriendButton
            onPress={declineRequest}
            friendshipRequested={false}
            isFriend={false}
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
            }}
          >
            <FriendButtonText>Recusar</FriendButtonText>
          </FriendButton>
        </>
      )}
    </Container>
  );
}
