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
import { useEventVariables } from '../../../../../hooks/eventVariables';

export function TasksSection(): JSX.Element {
  const { eventTasks } = useEventVariables();
  const { handleSectionDescriptionWindow } = useMyEvent();
  const { status, handleCreateTaskWindow } = useEventTasks();

  const sortedTasks = useMemo(() => {
    return eventTasks.length > 0
      ? eventTasks
        .filter(({ task }) => task.status === status)
        .sort((a, b) => {
          if (a.task.priority === 'low' && b.task.priority === 'neutral'
            || a.task.priority === 'low' && b.task.priority === 'high'
            || a.task.priority === 'neutral' && b.task.priority === 'high') return 1;
          if (a.task.priority === 'high' && b.task.priority === 'neutral'
            || a.task.priority === 'high' && b.task.priority === 'low'
            || a.task.priority === 'neutral' && b.task.priority === 'low') return -1;
          return 0;
        })
        .sort((a, b) => {
          if (new Date(a.task.due_date) > new Date(b.task.due_date)) return 1;
          if (new Date(a.task.due_date) < new Date(b.task.due_date)) return -1;
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
