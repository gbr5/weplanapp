import React from 'react';
import IUserFollowerDTO from '../../../../../dtos/IUserFollowerDTO';
import theme from '../../../../../global/styles/theme';

import { Container, Icon, Name } from './styles';

interface IProps {
  user: IUserFollowerDTO;
  handleSelectFollower: (follower: IUserFollowerDTO) => void;
  isSelected: boolean;
}

export function NewEventTaskFollower({
  handleSelectFollower,
  isSelected,
  user,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 5,
      }}
      onPress={() => handleSelectFollower(user)}
    >
      <Name>{user.follower.name}</Name>
      {isSelected ? <Icon name="check-square" /> : <Icon name="square" />}
      {/* <Type>{type}</Type> */}
    </Container>
  );
}
