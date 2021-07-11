import React, { useState } from 'react';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { TasksMenu } from '../TasksMenu';
import { EventTask } from '../EventTask';

import {
  Container,
  Title,
  TasksContainer,
} from './styles';

export function TasksSection(): JSX.Element {
  const { eventTasks } = useMyEvent();

  const [section, setSection] = useState('not started');

  function handleSection(newSection: string) {
    setSection(newSection);
  }

  return (
    <Container>
      <Title>Suas Tarefas</Title>
      <TasksMenu selectedSection={section} selectSection={(e: string) => handleSection(e)} />
      <TasksContainer
        data={eventTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventTask
            key={item.id}
            eventTask={item}
          />
        )}

      />
    </Container>
  );
}
