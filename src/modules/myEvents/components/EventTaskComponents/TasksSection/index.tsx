import React, { useState } from 'react';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { TasksMenu } from '../TasksMenu';
import { EventTask } from '../EventTask';

import {
  Container,
  Title,
  TasksContainer,
} from './styles';
import { useEventTasks } from '../../../../../hooks/eventTasks';

export function TasksSection(): JSX.Element {
  const { eventTasks } = useMyEvent();
  const { status, selectStatus } = useEventTasks();

  return (
    <Container>
      <Title>Suas Tarefas</Title>
      <TasksMenu />
      {status === 'not started' && (
        <TasksContainer
          data={eventTasks.filter(task => task.status === 'not started')}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventTask
              key={item.id}
              eventTask={item}
            />
          )}
        />
      )}
      {status === 'running' && (
        <TasksContainer
          data={eventTasks.filter(task => task.status === 'running')}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventTask
              key={item.id}
              eventTask={item}
            />
          )}
        />
      )}
      {status === 'finnished' && (
        <TasksContainer
          data={eventTasks.filter(task => task.status === 'finnished')}
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
