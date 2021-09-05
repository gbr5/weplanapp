import React, { useMemo } from 'react';

import profilePlaceholder from '../../../assets/profilePlaceholder.jpeg';

import IFriendDTO from '../../../dtos/IFriendDTO';
import theme from '../../../global/styles/theme';

import { Container, Avatar, Name } from './styles';

interface IProps {
  handleSelectFriend: (friend: IFriendDTO) => void;
  friend: IFriendDTO;
}

export function SelectOneFriendButton({
  friend,
  handleSelectFriend,
}: IProps): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const source = useMemo(
    () => !friend.friend.avatar_url
      ? profilePlaceholder
      : { uri: friend.friend.avatar_url },
    [friend],
  );

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 5,
      }}
      onPress={() => handleSelectFriend(friend)}
      isSelected={false}
    >
      <Avatar source={source}
      />
      <Name>{friend.friend.name}</Name>
    </Container>
  );
}
