import React from 'react';
import IFriendDTO from '../../../../dtos/IFriendDTO';
import theme from '../../../../global/styles/theme';
import { useFriends } from '../../../../hooks/friends';

import {
  Container,
  Name,
} from './styles';

interface IProps {
  friend: IFriendDTO;
}

export function FriendButton({ friend }: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { handleSelectedFriend, selectedFriend } = useFriends();

  function handleSelectFriend() {
    if (selectedFriend.id === friend.id)
      return handleSelectedFriend({} as IFriendDTO);
    return handleSelectedFriend(friend);
  }

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      isConfirmed={friend.isConfirmed}
      onPress={handleSelectFriend}
    >
      <Name>{friend.friend.name}</Name>
    </Container>
  );
}
