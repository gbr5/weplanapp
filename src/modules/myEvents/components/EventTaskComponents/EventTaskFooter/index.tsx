import React from 'react';
import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';
import theme from '../../../../../global/styles/theme';
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
  return (
    <Container>
      <PriorityButton>
        <PriorityButtonIcon
          color={eventTask.priority === 'neutral'
            ? theme.color.info
            : (eventTask.priority === 'low'
              ? theme.color.success
              : theme.color.atention
            )
          }
          name="flag"
        />
      </PriorityButton>
      <DateTime>Previsão</DateTime>
      <DateTime>{formatOnlyTime(String(eventTask.due_date))}</DateTime>
      <DateTime>{formatOnlyDateShort(String(eventTask.due_date))}</DateTime>
    </Container>
  );
}
