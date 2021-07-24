import React from 'react';

import {
  Container,
  Icon,
} from './styles';

interface IProps {
  top: string;
  right: string;
  onPress: () => void;
}

export function AddButton({
  top,
  right,
  onPress,
}: IProps) {
  return (
    <Container
      onPress={onPress}
      style={{
        top: `${top}`,
        right: `${right}`,
      }}
    >
      <Icon name="plus" />
    </Container>
  );
}
