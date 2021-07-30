import React, { useState } from 'react';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { TasksMenu } from '../TasksMenu';
import { EventTask } from '../EventTask';

import {
  Container,
  TitleContainer,
  Title,
  TasksContainer,
  AddButton,
  AddIcon,
} from './styles';
import { useEventTasks } from '../../../../../hooks/eventTasks';

export function TasksSection(): JSX.Element {
  const { selectedEvent } = useMyEvent();
  const { status, handleCreateTaskWindow } = useEventTasks();

  return (
    <Container>
      <TitleContainer>
        <Title>Suas Tarefas</Title>
        <AddButton onPress={handleCreateTaskWindow}>
          <AddIcon name="plus" />
        </AddButton>
      </TitleContainer>
      <TasksMenu />
      {selectedEvent.eventTasks
        && status === 'not started' && (
          <TasksContainer
            data={selectedEvent.eventTasks.filter(task => task.status === 'not started')}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventTask
                key={item.id}
                eventTask={item}
              />
            )}
          />
        )}
      {selectedEvent.eventTasks
        && status === 'running' && (
          <TasksContainer
            data={selectedEvent.eventTasks.filter(task => task.status === 'running')}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventTask
                key={item.id}
                eventTask={item}
              />
            )}
          />
        )}
      {selectedEvent.eventTasks
        && status === 'finnished' && (
          <TasksContainer
            data={selectedEvent.eventTasks.filter(task => task.status === 'finnished')}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventTask
                key={item.id}
                eventTask={item}
              />
            )}
          />
        )}
    </Container>
  );
}
