import React from 'react';
import { AddButton } from '../AddButton';
import { InfoButton } from '../InfoButton';
import { WindowHeader } from '../WindowHeader';

import { Container } from './styles';

interface IProps {
  title: string;
  handleInfoButton: () => void;
  handleAddButton: () => void;
}

export function SectionHeader({
  title,
  handleAddButton,
  handleInfoButton,
}: IProps) {
  return (
    <Container>
      <InfoButton
        onPress={handleInfoButton}
        top="0%"
        left="2%"
      />
      <WindowHeader title={title} />
      <AddButton
        onPress={handleAddButton}
        top="0%"
        right="2%"
      />
    </Container>
  );
}
