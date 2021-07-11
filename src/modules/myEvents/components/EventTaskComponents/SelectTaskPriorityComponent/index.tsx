import React from 'react';
import IPriorityButton from '../../../../../dtos/IPriorityButtonDTO';

import {
  Container,
  Title,
  IconContainer,
  Icon,
  IconButton,
} from './styles';

interface IProps {
  handleTaskPriority: (priority: string) => void;
  selectedPriority: 'low' | 'neutral' | 'high';
}

export function SelectTaskPriorityComponent({
  handleTaskPriority,
  selectedPriority,
}: IProps) {
  async function selectTaskPriority({ priority }: IPriorityButton) {
    handleTaskPriority(priority);
  }

  return (
    <Container>
      <Title>Defina a prioridade da tarefa</Title>
      <IconContainer>
        <IconButton
          isActive={selectedPriority === 'low'}
          onPress={() => selectTaskPriority({
            priority: 'low',
          })}
        >
          <Icon
            priority="low"
            name="flag"
          />
        </IconButton>
        <IconButton
          isActive={selectedPriority === 'neutral'}
          onPress={() => selectTaskPriority({
            priority: 'neutral',
          })}
        >
          <Icon
            priority="neutral"
            name="flag"
          />
        </IconButton>
        <IconButton
          isActive={selectedPriority === 'high'}
          onPress={() => selectTaskPriority({
            priority: 'high',
          })}
        >
          <Icon
            priority="high"
            name="flag"
          />
        </IconButton>
      </IconContainer>
    </Container>
  );
}
