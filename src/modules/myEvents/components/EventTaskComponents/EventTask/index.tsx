import React from 'react';
import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';
import formatOnlyDate from '../../../../../utils/formatOnlyDate';
import formatOnlyTime from '../../../../../utils/formatOnlyTime';
import { TaskTitle } from '../TaskTitle';

import {
  Container,
  Body,
  DateContainer,
  Date,
  Time,
  ButtonContainer,
  Button,
  DeleteButtonIcon,
  PriorityButtonIcon,
  StatusButtonIcon,
  NotesButtonIcon,
} from './styles';

interface IProps {
  eventTask: IEventTaskDTO;
}

export function EventTask({
  eventTask,
}: IProps) {
  const { selectEventTask } = useMyEvent();
  const {
    handleEditTaskPriorityWindow,
    handleEditTaskStatusWindow,
    handleEditTaskDateWindow,
    handleEditTaskTimeWindow,
    handleEventTaskNotesWindow,
  } = useEventTasks();
  const iconSize = 24;

  function handleOpenTaskPriorityWindow() {
    selectEventTask(eventTask);
    handleEditTaskPriorityWindow();
  }

  function handleOpenTaskStatusWindow() {
    selectEventTask(eventTask);
    handleEditTaskStatusWindow();
  }

  function handleOpenTaskDateWindow() {
    selectEventTask(eventTask);
    handleEditTaskDateWindow();
  }

  function handleOpenTaskTimeWindow() {
    selectEventTask(eventTask);
    handleEditTaskTimeWindow();
  }

  function handleOpenEventTaskNotesWindow() {
    selectEventTask(eventTask);
    handleEventTaskNotesWindow();
  }

  return (
    <Container>
      <TaskTitle eventTask={eventTask} />
      <Body>
        <DateContainer>
          <Button onPress={handleOpenTaskDateWindow}>
            <Date>{formatOnlyDate(String(eventTask.due_date))}</Date>
          </Button>
          <Button onPress={handleOpenTaskTimeWindow}>
            <Time>{formatOnlyTime(String(eventTask.due_date))}</Time>
          </Button>
        </DateContainer>
        <ButtonContainer>
          <Button
            onPress={handleOpenEventTaskNotesWindow}
          >
            <NotesButtonIcon name="file-text" size={iconSize} />
          </Button>
          <Button
            onPress={handleOpenTaskStatusWindow}
          >
            {eventTask.status === 'not started' && (
              <StatusButtonIcon
                size={iconSize}
                name="cloud"
                status={eventTask.status}
              />
            )}
            {eventTask.status === 'running' && (
              <StatusButtonIcon
                size={iconSize}
                name="zap"
                status={eventTask.status}
              />
            )}
            {eventTask.status === 'finnished' && (
              <StatusButtonIcon
                size={iconSize}
                name="award"
                status={eventTask.status}
              />
            )}
          </Button>
          <Button
            onPress={handleOpenTaskPriorityWindow}
          >
            <PriorityButtonIcon
              size={iconSize}
              name="flag"
              priority={eventTask.priority}
            />
          </Button>
          <Button>
            <DeleteButtonIcon name="trash-2" size={iconSize} />
          </Button>
        </ButtonContainer>
      </Body>
    </Container>
  );
};
