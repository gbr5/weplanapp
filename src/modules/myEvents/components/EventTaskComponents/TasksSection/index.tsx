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
import { useMemo } from 'react';

export function TasksSection(): JSX.Element {
  const { selectedEvent } = useMyEvent();
  const { status, handleCreateTaskWindow } = useEventTasks();

  const sortedTasks = useMemo(() => {
    return selectedEvent
      && selectedEvent.id
      && selectedEvent.eventTasks
      && selectedEvent.eventTasks.length > 0
        ? selectedEvent.eventTasks
          .filter(task => task.status === status)
          .sort((a, b) => {
            if (a.priority === 'low' && b.priority === 'neutral'
              || a.priority === 'low' && b.priority === 'high'
              || a.priority === 'neutral' && b.priority === 'high') return 1;
            if (a.priority === 'high' && b.priority === 'neutral'
              || a.priority === 'high' && b.priority === 'low'
              || a.priority === 'neutral' && b.priority === 'low') return -1;
            return 0;
          })
          .sort((a, b) => {
            if (new Date(a.due_date) > new Date(b.due_date)) return 1;
            if (new Date(a.due_date) < new Date(b.due_date)) return -1;
            return 0;
          })
        : [];
  }, [selectedEvent, status]);
  return (
    <Container>
      <TitleContainer>
        <Title>Suas Tarefas</Title>
        <AddButton onPress={handleCreateTaskWindow}>
          <AddIcon name="plus" />
        </AddButton>
      </TitleContainer>
      <TasksMenu />
      {sortedTasks.length > 0 && (
        <TasksContainer
          data={sortedTasks}
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
