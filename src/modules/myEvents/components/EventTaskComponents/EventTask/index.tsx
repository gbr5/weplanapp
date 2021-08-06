import React from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';

import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';

import { TaskTitle } from '../TaskTitle';
import { EventTaskFooter } from '../EventTaskFooter';
import { EventTaskBody } from '../EventTaskBody';

import { Container, CloseButton, CloseButtonTitle } from './styles';
import Button from '../../../../../components/Button';
import theme from '../../../../../global/styles/theme';

interface IProps {
  eventTask: IEventTaskDTO;
}

export function EventTask({
  eventTask,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;

  const { selectEventTask, selectedTask } = useMyEvent();

  function handleTaskBody() {
    !selectedTask
      || !selectedTask.id
      || selectedTask.id !== eventTask.id
        ? selectEventTask(eventTask)
        : selectEventTask({} as IEventTaskDTO);
  }

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      isActive={selectedTask.id === eventTask.id}
      onPress={handleTaskBody}
    >
      {selectedTask.id === eventTask.id && (
        <CloseButton onPress={handleTaskBody}>
          <CloseButtonTitle>Fechar</CloseButtonTitle>
        </CloseButton>
      )}
      <TaskTitle
        handleTaskBody={handleTaskBody}
        taskBody={selectedTask.id === eventTask.id}
        eventTask={eventTask}
      />
      {selectedTask.id !== eventTask.id
        && <EventTaskFooter eventTask={eventTask} />
      }
      {selectedTask.id === eventTask.id
        && <EventTaskBody />
      }
    </Container>
  );
};
