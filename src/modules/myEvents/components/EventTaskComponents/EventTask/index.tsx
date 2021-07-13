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
  StatusButton,
  PriorityButton,
  DeleteButton,
  NumberOfNotesContainer,
  NumberOfNotes,
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
    handleDeleteTaskConfirmationWindow,
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
            {eventTask.notes.length > 0 && (
              <NumberOfNotesContainer>
                <NumberOfNotes>{eventTask.notes.length}</NumberOfNotes>
              </NumberOfNotesContainer>
            )}
            <NotesButtonIcon name="file-text" size={iconSize} />
          </Button>
          <StatusButton
            onPress={handleOpenTaskStatusWindow}
            status={eventTask.status}
          >
            {eventTask.status === 'not started' && (
              <StatusButtonIcon
                size={iconSize}
                name="cloud"
              />
            )}
            {eventTask.status === 'running' && (
              <StatusButtonIcon
                size={iconSize}
                name="zap"
              />
            )}
            {eventTask.status === 'finnished' && (
              <StatusButtonIcon
                size={iconSize}
                name="award"
              />
            )}
          </StatusButton>
          <PriorityButton
            onPress={handleOpenTaskPriorityWindow}
            priority={eventTask.priority}
          >
            <PriorityButtonIcon
              size={iconSize}
              name="flag"
            />
          </PriorityButton>
          <DeleteButton
            onPress={handleDeleteTaskConfirmationWindow}
          >
            <DeleteButtonIcon name="trash-2" size={iconSize} />
          </DeleteButton>
        </ButtonContainer>
      </Body>
    </Container>
  );
};
