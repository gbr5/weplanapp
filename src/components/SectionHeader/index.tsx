import React from 'react';
import { AddButton } from '../AddButton';
import { InfoButton } from '../InfoButton';
import { WindowHeader } from '../WindowHeader';

import { Container } from './styles';

interface IProps {
  title: string;
  handleInfoButton: () => void;
  handleAddButton: () => void;
  firstIcon?: string;
}

export function SectionHeader({
  title,
  handleAddButton,
  handleInfoButton,
  firstIcon,
}: IProps) {
  return (
    <Container>
      <InfoButton
        onPress={handleInfoButton}
        top="0%"
        left="2%"
        icon={firstIcon}
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
