import React from 'react';
import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';
import theme from '../../../../../global/styles/theme';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';

import {
  TaskLabel,
  TitleContainer,
  Container,
  Title,
  TitleButton,
  UnderlineTitle,
} from './styles';

interface IProps {
  eventTask: IEventTaskDTO;
  handleTaskBody: () => void;
  taskBody: boolean;
}

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
        <UnderlineTitle />
      </TitleContainer>
    </Container>
  );
};
