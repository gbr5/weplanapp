import React from 'react';
import WindowContainer from '../../../../../components/WindowContainer';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';

import {
  Container,
  Title,
  Underline,
  IconContainer,
  Icon,
  IconButton,
} from './styles';

export function EditTaskStatusWindow() {
  const { selectedEventTask } = useEventVariables();
  const { updateTask, handleEditTaskStatusWindow } = useEventTasks();

  async function handleUpdateTaskStatus(status: 'not started' | 'running' | 'finnished') {
    await updateTask({
      ...selectedEventTask.task,
      status,
    });
    handleEditTaskStatusWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleEditTaskStatusWindow}
      top="10%"
      width="96%"
      left="2%"
      height="40%"
      zIndex={20}
    >
      <Container>
        <Title>Defina o Status da Tarefa</Title>
        <Underline />
        <IconContainer>
          <IconButton
            isActive={selectedEventTask.task.status === 'not started'}
            onPress={() => handleUpdateTaskStatus('not started')}
          >
            <Icon
              status="not started"
              name="cloud"
            />
          </IconButton>
          <IconButton
            isActive={selectedEventTask.task.status === 'running'}
            onPress={() => handleUpdateTaskStatus('running')}
          >
            <Icon
              status="running"
              name="zap"
            />
          </IconButton>
          <IconButton
            isActive={selectedEventTask.task.status === 'finnished'}
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
