import React from 'react';
import { useState } from 'react';
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
  ArrowButton,
  StatusButton,
  PriorityButton,
  DeleteButton,
  NumberOfNotesContainer,
  NumberOfNotes,
  DeleteButtonIcon,
  PriorityButtonIcon,
  StatusButtonIcon,
  NotesButtonIcon,
  ArrowIcon,
  ButtonMainContainer,
} from './styles';

interface IProps {
  eventTask: IEventTaskDTO;
}

export function EventTask({
  eventTask,
}: IProps) {
  const { selectEventTask, selectedTask } = useMyEvent();
  const {
    handleEditTaskPriorityWindow,
    handleEditTaskStatusWindow,
    handleEditTaskDateWindow,
    handleEditTaskTimeWindow,
    handleEventTaskNotesWindow,
    handleDeleteTaskConfirmationWindow,
  } = useEventTasks();

  function handleTaskBody() {
    !selectedTask
      || !selectedTask.id
      || selectedTask.id !== eventTask.id
        ? selectEventTask(eventTask)
        : selectEventTask({} as IEventTaskDTO);
  }

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
      <TaskTitle
        handleTaskBody={handleTaskBody}
        taskBody={selectedTask.id === eventTask.id}
        eventTask={eventTask}
      />
      {selectedTask.id === eventTask.id && (
        <ArrowButton onPress={handleTaskBody}>
          <Date>Fechar</Date>
          <ArrowIcon name="arrow-up" />
        </ArrowButton>
      )}
      {selectedTask.id === eventTask.id && (
        <Body>
          <DateContainer>
            <Button onPress={handleOpenTaskDateWindow}>
              <Date>{formatOnlyDate(String(eventTask.due_date))}</Date>
            </Button>
            <Button onPress={handleOpenTaskTimeWindow}>
              <Time>{formatOnlyTime(String(eventTask.due_date))}</Time>
            </Button>
          </DateContainer>
          <ButtonMainContainer>
            <ButtonContainer>
              <Button
                onPress={handleOpenEventTaskNotesWindow}
              >
                {eventTask.notes.length > 0 && (
                  <NumberOfNotesContainer>
                    <NumberOfNotes>{eventTask.notes.length}</NumberOfNotes>
                  </NumberOfNotesContainer>
                )}
                <NotesButtonIcon name="file-text" />
              </Button>
              <StatusButton
                onPress={handleOpenTaskStatusWindow}
                status={eventTask.status}
              >
                {eventTask.status === 'not started' && (
                  <StatusButtonIcon name="cloud" />
                )}
                {eventTask.status === 'running' && (
                  <StatusButtonIcon name="zap" />
                )}
                {eventTask.status === 'finnished' && (
                  <StatusButtonIcon name="award" />
                )}
              </StatusButton>
            </ButtonContainer>
            <ButtonContainer>
              <PriorityButton
                onPress={handleOpenTaskPriorityWindow}
                priority={eventTask.priority}
              >
                <PriorityButtonIcon name="flag" />
              </PriorityButton>
              <DeleteButton
                onPress={handleDeleteTaskConfirmationWindow}
              >
                <DeleteButtonIcon name="trash-2" />
              </DeleteButton>
            </ButtonContainer>
          </ButtonMainContainer>
        </Body>
      )}
    </Container>
  );
};
