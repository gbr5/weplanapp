import React from 'react';
import IEventTaskFollowerDTO from '../../../../../dtos/IEventTaskFollowerDTO';
import IUserFollowerDTO from '../../../../../dtos/IUserFollowerDTO';
import theme from '../../../../../global/styles/theme';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';

import { Container, Icon, Name } from './styles';

interface IProps {
  user: IEventTaskFollowerDTO;
}

export function EventTaskFollower({
  user,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { handleDeleteTaskFollowerConfirmation } = useEventTasks();
  const { selectEventTaskFollower } = useEventVariables();

  function deleteFollower() {
    selectEventTaskFollower(user);
    handleDeleteTaskFollowerConfirmation();
  }

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 5,
      }}
      onPress={deleteFollower}
    >
      <Name>{user.follower.name}</Name>
      <Icon name="trash-2" />
    </Container>
  );
}
