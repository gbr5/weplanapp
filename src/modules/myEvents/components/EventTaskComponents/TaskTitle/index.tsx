import React from 'react';
import theme from '../../../../../global/styles/theme';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';

import {
  Container,
  TaskLabel,
  TitleContainer,
  Title,
  TitleButton,
} from './styles';

export function TaskTitle(): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { selectedTask } = useMyEvent();
  const { handleEditTaskTitleWindow } = useEventTasks();

  function handleSelectTask() {
    handleEditTaskTitleWindow();
  }
  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
    >
      <TitleContainer>
        <TitleButton onPress={handleSelectTask}>
          <TaskLabel>Editar Tarefa:</TaskLabel>
          <Title>
            {selectedTask.title}
          </Title>
        </TitleButton>
      </TitleContainer>
    </Container>
  );
};
