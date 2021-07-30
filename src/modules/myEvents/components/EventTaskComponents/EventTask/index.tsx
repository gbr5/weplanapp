import React from 'react';

import formatOnlyDate from '../../../../../utils/formatOnlyDate';
import formatOnlyTime from '../../../../../utils/formatOnlyTime';

import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';

import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';

import { TaskTitle } from '../TaskTitle';

import {
  Container,
  Body,
  DateContainer,
  Date,
  Time,
  Button,
  NoteButton,
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
  Legend,
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

            {/* <DeleteButtonContainer> */}
            <DeleteButton
                onPress={handleDeleteTaskConfirmationWindow}
              >
                <Legend>Deletar</Legend>
                <DeleteButtonIcon name="trash-2" />
              </DeleteButton>
            {/* </DeleteButtonContainer> */}
          </DateContainer>
          <ButtonMainContainer>
            {/* <ButtonContainer> */}
              {/* {eventTask.status === 'not started' && (
                <Legend>Início</Legend>
              )}
              {eventTask.status === 'running' && (
                <Legend>Execução</Legend>
              )}
              {eventTask.status === 'finnished' && (
                <Legend>Fim</Legend>
              )} */}
              <StatusButton
                onPress={handleOpenTaskStatusWindow}
                status={eventTask.status}
              >
                <Legend>Status</Legend>
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
            {/* </ButtonContainer> */}
            {/* <ButtonContainer> */}
              {/* {eventTask.priority === 'low' && (
                <Legend>Baixa</Legend>
              )}
              {eventTask.priority === 'neutral' && (
                <Legend>Neutra</Legend>
              )}
              {eventTask.priority === 'high' && (
                <Legend>Alta</Legend>
              )} */}
              <PriorityButton
                onPress={handleOpenTaskPriorityWindow}
                priority={eventTask.priority}
              >
                <Legend>Prioridade</Legend>
                <PriorityButtonIcon name="flag" />
              </PriorityButton>
            {/* </ButtonContainer> */}

            <NoteButton onPress={handleOpenEventTaskNotesWindow}>
              {eventTask.notes.length > 0 && (
                <NumberOfNotesContainer>
                  <NumberOfNotes>{eventTask.notes.length}</NumberOfNotes>
                </NumberOfNotesContainer>
              )}
              <Legend>Notas</Legend>
              <NotesButtonIcon name="file-text" />
            </NoteButton>
          </ButtonMainContainer>
        </Body>
      )}
    </Container>
  );
};
