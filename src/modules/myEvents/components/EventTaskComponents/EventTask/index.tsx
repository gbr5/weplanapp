import React from 'react';

import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';

import { EventTaskFooter } from '../EventTaskFooter';
import { EventTaskBody } from '../EventTaskBody';

import {
  Container,
  Title,
  Underline,
} from './styles';
import theme from '../../../../../global/styles/theme';
import CloseButton from '../../../../../components/CloseButton';
import { useEventVariables } from '../../../../../hooks/eventVariables';

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

  const { selectEventTask, selectedEventTask } = useEventVariables();

  function handleTaskBody() {
    !selectedEventTask
      || !selectedEventTask.id
      || selectedEventTask.id !== eventTask.id
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
          elevation: 8,
        }}
        isActive={selectedEventTask.id === eventTask.id}
        onPress={handleTaskBody}
      >
        <Title>{eventTask.task.title}</Title>
        <Underline />
        {selectedEventTask.id !== eventTask.id ? (
          <EventTaskFooter eventTask={eventTask} />
        ) : (
          <CloseButton closeFunction={handleTaskBody} />
        )}
      </Container>
      {selectedEventTask.id === eventTask.id && (
        <EventTaskBody />
      )}
    </>
  );
};
