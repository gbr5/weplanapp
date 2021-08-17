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
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.buttonShadow;
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
        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
          onPress={handleEditTaskStatusWindow}
        >
          <MenuTitle>Status</MenuTitle>
          <IconContainer color={status.color}>
            <FunctionIcon name={status.icon} />
            <MenuText>{status.title}</MenuText>
          </IconContainer>
        </MenuButton>
        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
          onPress={handleEditTaskPriorityWindow}
        >
          <MenuTitle>Prioridade</MenuTitle>
          <IconContainer color={priority.color} >
            <FunctionIcon name="flag" />
            <MenuText>{priority.title}</MenuText>
          </IconContainer>
        </MenuButton>
        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
          onPress={handleEventTaskNotesWindow}
        >
          <MenuTitle>Notas</MenuTitle>
          <IconContainer color={theme.color.info_light}>
            <Icon name="file-text" />
            {selectedTask.notes.length > 0 && (
              <NumberOfNotesContainer>
                <NumberOfNotes>{selectedTask.notes.length}</NumberOfNotes>
              </NumberOfNotesContainer>
            )}
          </IconContainer>
        </MenuButton>
        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
          onPress={handleDeleteTaskConfirmationWindow}
        >
          <MenuTitle>Deletar</MenuTitle>
          <IconContainer color={theme.color.atention}>
            <Icon name="trash-2" />
          </IconContainer>
        </MenuButton>
      </Menu>
      <DateContainer>
        <DateHeader>Data Prevista</DateHeader>
        <DateButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
          onPress={handleEditTaskTimeWindow}
        >
          <DateText>
            {formatOnlyTime(String(selectedTask.due_date))}
          </DateText>
        </DateButton>
        <DateButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
          onPress={handleEditTaskDateWindow}
        >
          <DateText>
          {formatOnlyDateShort(String(selectedTask.due_date))}
          </DateText>
        </DateButton>
      </DateContainer>
    </Container>
  );
}
