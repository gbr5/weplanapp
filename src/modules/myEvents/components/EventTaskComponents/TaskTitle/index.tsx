import React from 'react';
import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';

import {
  Container,
  Title,
  TitleButton,
  UnderlineTitle,
  EditTitleIcon,
  IconContainer,
} from './styles';

interface IProps {
  eventTask: IEventTaskDTO;
}

export function TaskTitle({
  eventTask,
}: IProps): JSX.Element {
  const { selectEventTask } = useMyEvent();
  const { handleEditTaskTitleWindow } = useEventTasks();

  function handleSelectTask() {
    selectEventTask(eventTask);
    handleEditTaskTitleWindow();
  }
  return (
    <Container>
      <TitleButton onPress={handleSelectTask}>
        <Title>{eventTask.title}</Title>
        <IconContainer>
          <EditTitleIcon name="edit-2" />
        </IconContainer>
      </TitleButton>
      <UnderlineTitle />
    </Container>
  );
};
