import React from 'react';
import theme from '../../global/styles/theme';

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
  const {
    elevation,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.iconButtonShadow;
  return (
    <Container
      onPress={onPress}
      style={{
        elevation,
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        top: `${top}`,
        left: `${left}`,
      }}
    >
      <Icon name="info" />
    </Container>
  );
}
