import React from 'react';
import { useMemo } from 'react';
import theme from '../../../../../global/styles/theme';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';
import formatOnlyTime from '../../../../../utils/formatOnlyTime';

import {
  Container,
  Menu,
  MenuButton,
  IconContainer,
  FunctionIcon,
  Icon,
  MenuText,
  MenuTitle,
  DateContainer,
  DateHeader,
  DateText,
  DateButton,
  NumberOfNotesContainer,
  NumberOfNotes,
} from './styles';

export function EventTaskBody() {
  const { selectedTask } = useMyEvent();
  const {
    handleEditTaskPriorityWindow,
    handleEditTaskStatusWindow,
    handleEditTaskDateWindow,
    handleEditTaskTimeWindow,
    handleEventTaskNotesWindow,
    handleDeleteTaskConfirmationWindow,
  } = useEventTasks();


  const status = useMemo(() => {
    const title = selectedTask.status === 'not started'
      ? 'Início'
      : (selectedTask.status === 'running'
        ? 'Execução'
        : 'Fim');
    const icon = selectedTask.status === 'not started'
      ? 'cloud'
      : (selectedTask.status === 'running'
        ? 'zap'
        : 'award');
    const color = selectedTask.status === 'not started'
      ? theme.color.info
      : (selectedTask.status === 'running'
        ? theme.color.atention
        : theme.color.success);
    return {
      title,
      icon,
      color,
    };
  }, [selectedTask]);

  const priority = useMemo(() => {
    const title = selectedTask.priority === 'low'
      ? 'Baixa'
      : (selectedTask.priority === 'neutral'
        ? 'Neutra'
        : 'Alta');
    const color = selectedTask.priority === 'low'
      ? theme.color.success
      : (selectedTask.priority === 'neutral'
        ? theme.color.info
        : theme.color.atention);
    return {
      title,
      color,
    };
  }, [selectedTask]);

  return (
    <Container>
      <Menu horizontal>
        <MenuButton onPress={handleEditTaskStatusWindow}>
          <IconContainer color={status.color}>
            <FunctionIcon name={status.icon} />
            <MenuText>{status.title}</MenuText>
          </IconContainer>
          <MenuTitle>Status</MenuTitle>
        </MenuButton>
        <MenuButton onPress={handleEditTaskPriorityWindow}>
          <IconContainer color={priority.color} >
            <FunctionIcon name="flag" />
            <MenuText>{priority.title}</MenuText>
          </IconContainer>
          <MenuTitle>Prioridade</MenuTitle>
        </MenuButton>
        <MenuButton onPress={handleEventTaskNotesWindow}>
          <IconContainer color={theme.color.info_light}>
            <Icon name="file-text" />
            {selectedTask.notes.length > 0 && (
              <NumberOfNotesContainer>
                <NumberOfNotes>{selectedTask.notes.length}</NumberOfNotes>
              </NumberOfNotesContainer>
            )}
          </IconContainer>
          <MenuTitle>Notas</MenuTitle>
        </MenuButton>
        <MenuButton onPress={handleDeleteTaskConfirmationWindow}>
          <IconContainer color={theme.color.atention}>
            <Icon name="trash-2" />
          </IconContainer>
          <MenuTitle>Deletar</MenuTitle>
        </MenuButton>
      </Menu>
      <DateContainer>
        <DateHeader>Data Prevista</DateHeader>
        <DateButton onPress={handleEditTaskTimeWindow}>
          <DateText>
            {formatOnlyTime(String(selectedTask.due_date))}
          </DateText>
        </DateButton>
        <DateButton onPress={handleEditTaskDateWindow}>
          <DateText>
          {formatOnlyDateShort(String(selectedTask.due_date))}
          </DateText>
        </DateButton>
      </DateContainer>
    </Container>
  );
}
