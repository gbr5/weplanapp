import React from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';

import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';

import { TaskTitle } from '../TaskTitle';

import { Container } from './styles';
import { EventTaskFooter } from '../EventTaskFooter';
import { EventTaskBody } from '../EventTaskBody';

interface IProps {
  eventTask: IEventTaskDTO;
}

export function EventTask({
  eventTask,
}: IProps) {
  const { selectEventTask, selectedTask } = useMyEvent();

  function handleTaskBody() {
    !selectedTask
      || !selectedTask.id
      || selectedTask.id !== eventTask.id
        ? selectEventTask(eventTask)
        : selectEventTask({} as IEventTaskDTO);
  }

  return (
    <Container>
      <TaskTitle
        handleTaskBody={handleTaskBody}
        taskBody={selectedTask.id === eventTask.id}
        eventTask={eventTask}
      />
      {selectedTask.id !== eventTask.id
        && <EventTaskFooter eventTask={eventTask} />
      }
      {selectedTask.id === eventTask.id && (
        <EventTaskBody />
      )}
    </Container>
  );
};
