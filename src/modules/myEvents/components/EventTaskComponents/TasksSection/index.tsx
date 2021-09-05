import React, { useMemo } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventTasks } from '../../../../../hooks/eventTasks';

import { TasksMenu } from '../TasksMenu';
import { EventTask } from '../EventTask';
import { SectionHeader } from '../../../../../components/SectionHeader';

import {
  Container,
  TasksContainer,
} from './styles';

export function TasksSection(): JSX.Element {
  const { eventTasks, handleSectionDescriptionWindow } = useMyEvent();
  const { status, handleCreateTaskWindow } = useEventTasks();

  const sortedTasks = useMemo(() => {
    return eventTasks.length > 0
      ? eventTasks
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
  }, [eventTasks, status]);
  return (
    <Container>
      <SectionHeader
        handleAddButton={handleCreateTaskWindow}
        handleInfoButton={handleSectionDescriptionWindow}
        title="Suas Tarefas"
      />
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
