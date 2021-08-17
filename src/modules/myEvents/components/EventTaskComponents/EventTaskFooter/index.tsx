import React, { useMemo } from 'react';
import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';
import theme from '../../../../../global/styles/theme';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';
import formatOnlyTime from '../../../../../utils/formatOnlyTime';

import {
  Container,
  DateTime,
  PriorityButton,
  PriorityButtonIcon,
  Legend,
} from './styles';

interface IProps {
  eventTask: IEventTaskDTO;
}

export function EventTaskFooter({
  eventTask,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.buttonShadow;
  const { selectEventTask, selectedTask } = useMyEvent();
  const {
    handleEditTaskPriorityWindow,
    handleEditTaskStatusWindow,
  } = useEventTasks();

  function handleTaskPriority() {
    !selectedTask
      || !selectedTask.id
      || selectedTask.id !== eventTask.id
        ? (
            selectEventTask(eventTask),
            handleEditTaskPriorityWindow()
          )
        : selectEventTask({} as IEventTaskDTO);
  }

  function handleTaskStatus() {
    !selectedTask
      || !selectedTask.id
      || selectedTask.id !== eventTask.id
        ? (
            selectEventTask(eventTask),
            handleEditTaskStatusWindow()
          )
        : selectEventTask({} as IEventTaskDTO);
  }

  const priorityColor = useMemo(() => {
    return eventTask.priority === 'neutral'
      ? theme.color.info
      : (eventTask.priority === 'low'
        ? theme.color.success
        : theme.color.atention
    );
  }, [eventTask.priority]);

  const status = useMemo(() => {
    return eventTask.status === 'not started'
      ? 'cloud'
      : (eventTask.status === 'running'
        ? 'zap'
        : 'award'
    );
  }, [eventTask.status]);

  const statusColor = useMemo(() => {
    return eventTask.status === 'not started'
      ? theme.color.info
      : (eventTask.status === 'running'
        ? theme.color.atention
        : theme.color.success
    );
  }, [eventTask.status]);

  return (
    <Container>
      <PriorityButton
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
        onPress={handleTaskPriority}
      >
        <PriorityButtonIcon
          color={priorityColor}
          name="flag"
        />
      </PriorityButton>
      <PriorityButton
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
        onPress={handleTaskStatus}
      >
        <PriorityButtonIcon
          color={statusColor}
          name={status}
        />
      </PriorityButton>
      <DateTime>Previsão:</DateTime>
      <DateTime>{formatOnlyTime(String(eventTask.due_date))}</DateTime>
      <DateTime>{formatOnlyDateShort(String(eventTask.due_date))}</DateTime>
    </Container>
  );
}
