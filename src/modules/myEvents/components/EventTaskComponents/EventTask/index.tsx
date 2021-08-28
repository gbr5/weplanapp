import React from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';

import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';

import { TaskTitle } from '../TaskTitle';
import { EventTaskFooter } from '../EventTaskFooter';
import { EventTaskBody } from '../EventTaskBody';

  // CloseButton,
  // CloseButtonTitle,
import {
  Container,
  Title,
  Underline,
} from './styles';
import theme from '../../../../../global/styles/theme';
import CloseButton from '../../../../../components/CloseButton';

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
    <>
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
        <Title>{eventTask.title}</Title>
        <Underline />
        {selectedTask.id !== eventTask.id ? (
          <EventTaskFooter eventTask={eventTask} />
        ) : (
          <CloseButton closeFunction={handleTaskBody} />
        )}
      </Container>
      {selectedTask.id === eventTask.id && (
        <EventTaskBody />
      )}
    </>
  );
};
