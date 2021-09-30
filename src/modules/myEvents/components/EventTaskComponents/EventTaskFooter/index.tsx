import React, { useMemo } from 'react';
import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';
import theme from '../../../../../global/styles/theme';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';
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
  const { selectEventTask, selectedEventTask } = useEventVariables();
  const {
    handleEditTaskPriorityWindow,
    handleEditTaskStatusWindow,
  } = useEventTasks();

  function handleTaskPriority() {
    !selectedEventTask
      || !selectedEventTask.id
      || selectedEventTask.id !== eventTask.id
        ? (
            selectEventTask(eventTask),
            handleEditTaskPriorityWindow()
          )
        : selectEventTask({} as IEventTaskDTO);
  }

  function handleTaskStatus() {
    !selectedEventTask
      || !selectedEventTask.id
      || selectedEventTask.id !== eventTask.id
        ? (
            selectEventTask(eventTask),
            handleEditTaskStatusWindow()
          )
        : selectEventTask({} as IEventTaskDTO);
  }

  const priorityColor = useMemo(() => {
    return eventTask.task.priority === 'neutral'
      ? theme.color.info
      : (eventTask.task.priority === 'low'
        ? theme.color.success
        : theme.color.atention
    );
  }, [eventTask.task.priority]);

  const status = useMemo(() => {
    return eventTask.task.status === 'not started'
      ? 'cloud'
      : (eventTask.task.status === 'running'
        ? 'zap'
        : 'award'
    );
  }, [eventTask.task.status]);

  const statusColor = useMemo(() => {
    return eventTask.task.status === 'not started'
      ? theme.color.info
      : (eventTask.task.status === 'running'
        ? theme.color.atention
        : theme.color.success
    );
  }, [eventTask.task.status]);

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
      <DateTime>{formatOnlyTime(String(eventTask.task.due_date))}</DateTime>
      <DateTime>{formatOnlyDateShort(String(eventTask.task.due_date))}</DateTime>
    </Container>
  );
}
