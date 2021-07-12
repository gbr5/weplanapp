import React from 'react';
import WindowContainer from '../../../../../components/WindowContainer';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';

import {
  Container,
  Title,
  IconContainer,
  Icon,
  IconButton,
} from './styles';

export function EditTaskStatusWindow() {
  const { selectedTask } = useMyEvent();
  const { updateTask, handleEditTaskStatusWindow } = useEventTasks();

  async function handleUpdateTaskStatus(status: 'not started' | 'running' | 'finnished') {
    await updateTask({
      ...selectedTask,
      status,
    });
    handleEditTaskStatusWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleEditTaskStatusWindow}
      top="30%"
      width="100%"
      left="0%"
      height="30%"
      zIndex={20}
    >
      <Container>
        <Title>Defina o status da tarefa</Title>
        <IconContainer>
          <IconButton
            isActive={selectedTask.status === 'not started'}
            onPress={() => handleUpdateTaskStatus('not started')}
          >
            <Icon
              status="not started"
              name="cloud"
            />
          </IconButton>
          <IconButton
            isActive={selectedTask.status === 'running'}
            onPress={() => handleUpdateTaskStatus('running')}
          >
            <Icon
              status="running"
              name="zap"
            />
          </IconButton>
          <IconButton
            isActive={selectedTask.status === 'finnished'}
            onPress={() => handleUpdateTaskStatus('finnished')}
          >
            <Icon
              status="finnished"
              name="award"
            />
          </IconButton>
        </IconContainer>
      </Container>
    </WindowContainer>
  );
}
