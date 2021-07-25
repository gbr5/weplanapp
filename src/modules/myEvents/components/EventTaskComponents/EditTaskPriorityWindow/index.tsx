import React from 'react';
import WindowContainer from '../../../../../components/WindowContainer';
import IPriorityButton from '../../../../../dtos/IPriorityButtonDTO';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';

import {
  Container,
  Title,
  Underline,
  IconContainer,
  Icon,
  IconButton,
} from './styles';

export function EditTaskPriorityWindow() {
  const { selectedTask } = useMyEvent();
  const { updateTask, handleEditTaskPriorityWindow } = useEventTasks();

  async function handleUpdateTaskPriority({ priority }: IPriorityButton) {
    await updateTask({
      ...selectedTask,
      priority,
    });
    handleEditTaskPriorityWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleEditTaskPriorityWindow}
      top="10%"
      width="100%"
      left="0%"
      height="40%"
      zIndex={20}
    >
      <Container>
        <Title>Defina a prioridade da tarefa</Title>
        <Underline />
        <IconContainer>
          <IconButton
            isActive={selectedTask.priority === 'low'}
            onPress={() => handleUpdateTaskPriority({
              priority: 'low',
            })}
          >
            <Icon
              priority="low"
              name="flag"
            />
          </IconButton>
          <IconButton
            isActive={selectedTask.priority === 'neutral'}
            onPress={() => handleUpdateTaskPriority({
              priority: 'neutral',
            })}
          >
            <Icon
              priority="neutral"
              name="flag"
            />
          </IconButton>
          <IconButton
            isActive={selectedTask.priority === 'high'}
            onPress={() => handleUpdateTaskPriority({
              priority: 'high',
            })}
          >
            <Icon
              priority="high"
              name="flag"
            />
          </IconButton>
        </IconContainer>
      </Container>
    </WindowContainer>
  );
}
