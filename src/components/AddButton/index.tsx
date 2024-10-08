import React from 'react';
import theme from '../../global/styles/theme';

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
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        top: `${top}`,
        right: `${right}`,
        elevation: 5,
      }}
      onPress={onPress}

    >
      <Icon name="plus" />
    </Container>
  );
}
