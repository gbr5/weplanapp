import React from 'react';
import { SectionHeader } from '../../../../../components/SectionHeader';
import WindowContainer from '../../../../../components/WindowContainer';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { EventTask } from '../EventTask';
import { EventTaskFollower } from '../EventTaskFollower';

import {
  Container,
} from './styles';

export function UserEventTasksWindow() {
  const { selectedUserEventTasks } = useEventVariables();
  const { handleSectionDescriptionWindow } = useMyEvent();
  const {
    handleCreateTaskWindow,
    handleUserEventTasksWindow,
  } = useEventTasks();

  return (
    <WindowContainer
      closeWindow={handleUserEventTasksWindow}
      zIndex={8}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <SectionHeader
          title="Tarefas"
          handleAddButton={handleCreateTaskWindow}
          handleInfoButton={handleSectionDescriptionWindow}
        />
        {selectedUserEventTasks.map(task => {
          return (
            <EventTask key={task.id} eventTask={task} />
          );
        })}
      </Container>
    </WindowContainer>
  );
}
