import React, { useMemo } from 'react';
import IUserDTO from '../../../../../dtos/IUserDTO';
import IUserFollowerDTO from '../../../../../dtos/IUserFollowerDTO';

import theme from '../../../../../global/styles/theme';
import { useAuth } from '../../../../../hooks/auth';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';
import formatOnlyTime from '../../../../../utils/formatOnlyTime';

import { TaskTitle } from '../TaskTitle';

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

export function EventTaskBody(): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.buttonShadow;
  const { user } = useAuth();
  const {
    selectedEventTask,
    eventOwners,
    eventMembers,
    eventSuppliers,
  } = useEventVariables();
  const {
    handleEditTaskPriorityWindow,
    handleEditTaskStatusWindow,
    handleEditTaskDateWindow,
    handleEditTaskTimeWindow,
    handleEventTaskNotesWindow,
    handleEventTaskFollowersWindow,
    handleDeleteTaskConfirmationWindow,
  } = useEventTasks();

  const status = useMemo(() => {
    const title = selectedEventTask.status === 'not started'
      ? 'Início'
      : (selectedEventTask.status === 'running'
        ? 'Execução'
        : 'Fim');
    const icon = selectedEventTask.status === 'not started'
      ? 'cloud'
      : (selectedEventTask.status === 'running'
        ? 'zap'
        : 'award');
    const color = selectedEventTask.status === 'not started'
      ? theme.color.info
      : (selectedEventTask.status === 'running'
        ? theme.color.atention
        : theme.color.success);
    return {
      title,
      icon,
      color,
    };
  }, [selectedEventTask]);

  const priority = useMemo(() => {
    const title = selectedEventTask.priority === 'low'
      ? 'Baixa'
      : (selectedEventTask.priority === 'neutral'
        ? 'Neutra'
        : 'Alta');
    const color = selectedEventTask.priority === 'low'
      ? theme.color.success
      : (selectedEventTask.priority === 'neutral'
        ? theme.color.info
        : theme.color.atention);
    return {
      title,
      color,
    };
  }, [selectedEventTask]);

  const ownersMembersAndWePlanSuppliers = useMemo(() => {
    const users: IUserFollowerDTO[] = [];
    if (eventOwners.length > 0) {
      eventOwners
        .filter(owner => owner.userEventOwner.id !== user.id)
        .map(owner => users.push({
          follower: owner.userEventOwner,
          type: 'owner',
        }));
    }
    if (eventMembers.length > 0) {
      eventMembers
        .filter(owner => owner.userEventMember.id !== user.id)
        .map(owner => users.push({
          follower: owner.userEventMember,
          type: 'member',
        }));
    }
    if (eventSuppliers.length > 0) {
      eventSuppliers
        .filter(owner => owner.weplanUser)
        .map(owner => users.push({
          follower: owner.eventWeplanSupplier.weplanEventSupplier,
          type: 'supplier',
        }));
    }
    return users;
    }, [eventSuppliers, eventOwners, eventMembers]);

  return (
    <Container
      style={{
        shadowColor: theme.objectButtonShadow.shadowColor,
        shadowOffset: theme.objectButtonShadow.shadowOffset,
        shadowOpacity: theme.objectButtonShadow.shadowOpacity,
        shadowRadius: theme.objectButtonShadow.shadowRadius,
        elevation: 5,
      }}
    >
      <TaskTitle />
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
          <IconContainer
            style={{
              elevation: 5,
            }}
            color={status.color}
          >
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
          <IconContainer
            style={{
              elevation: 5,
            }}
            color={priority.color}
          >
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
          <IconContainer
            style={{
              elevation: 5,
            }}
            color={theme.color.info_light}
          >
            <Icon name="file-text" />
            {selectedEventTask.notes.length > 0 && (
              <NumberOfNotesContainer>
                <NumberOfNotes>{selectedEventTask.notes.length}</NumberOfNotes>
              </NumberOfNotesContainer>
            )}
          </IconContainer>
        </MenuButton>
        {ownersMembersAndWePlanSuppliers.length > 0 && (
          <MenuButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
            }}
            onPress={handleEventTaskFollowersWindow}
          >
            <MenuTitle>Seguidores</MenuTitle>
            <IconContainer
              style={{
                elevation: 5,
              }}
              color={theme.color.title}
            >
              <Icon name="users" />
              {selectedEventTask.followers.length > 0 && (
                <NumberOfNotesContainer>
                  <NumberOfNotes>{selectedEventTask.followers.length}</NumberOfNotes>
                </NumberOfNotesContainer>
              )}
            </IconContainer>
          </MenuButton>
        )}
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
          <IconContainer
            style={{
              elevation: 5,
            }}
            color={theme.color.atention}
          >
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
            elevation: 5,
          }}
          onPress={handleEditTaskTimeWindow}
        >
          <DateText>
            {formatOnlyTime(String(selectedEventTask.due_date))}
          </DateText>
        </DateButton>
        <DateButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={handleEditTaskDateWindow}
        >
          <DateText>
          {formatOnlyDateShort(String(selectedEventTask.due_date))}
          </DateText>
        </DateButton>
      </DateContainer>
    </Container>
  );
}
