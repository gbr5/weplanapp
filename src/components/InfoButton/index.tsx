import React from 'react';

import {
  Container,
  Icon,
} from './styles';

interface IProps {
  top: string;
  left: string;
  onPress: () => void;
}

export function InfoButton({
  top,
  left,
  onPress,
}: IProps) {
  return (
    <Container
      onPress={onPress}
      style={{
        top: `${top}`,
        left: `${left}`,
      }}
    >
      <Icon name="info" />
    </Container>
  );
}
