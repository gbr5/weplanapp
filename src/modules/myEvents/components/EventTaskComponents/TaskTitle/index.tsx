import React from 'react';
import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useMyEvent } from '../../../../../hooks/myEvent';

import {
  ArrowButton,
  ArrowIcon,
  TitleContainer,
  Container,
  Title,
  TitleButton,
  UnderlineTitle,
  EditTitleIcon,
  IconContainer,
} from './styles';

interface IProps {
  eventTask: IEventTaskDTO;
  handleTaskBody: () => void;
  taskBody: boolean;
}

export function TaskTitle({
  eventTask,
  handleTaskBody,
  taskBody,
}: IProps): JSX.Element {
  const { selectEventTask } = useMyEvent();
  const { handleEditTaskTitleWindow } = useEventTasks();

  function handleSelectTask() {
    selectEventTask(eventTask);
    handleEditTaskTitleWindow();
  }
  return (
    <Container>
      <TitleContainer>
        {taskBody ? (
          <TitleButton onPress={handleSelectTask}>
            <Title>
              {eventTask.title}
            </Title>
            <IconContainer>
              <EditTitleIcon name="edit-2" />
            </IconContainer>
          </TitleButton>
        ) : (
          <TitleButton onPress={handleTaskBody}>
            <Title>
              {eventTask.title}
            </Title>
            <ArrowButton onPress={handleTaskBody}>
              <ArrowIcon name="arrow-down" />
            </ArrowButton>
          </TitleButton>
        )}
        <UnderlineTitle />
      </TitleContainer>
    </Container>
  );
};
