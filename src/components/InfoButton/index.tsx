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
  icon?: string;
}

export function InfoButton({
  top,
  left,
  onPress,
  icon,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  return (
    <Container
      onPress={onPress}
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        top: `${top}`,
        left: `${left}`,
        elevation: 5,
      }}
    >
      {icon ? <Icon name={icon} /> : <Icon name="info" />}
    </Container>
  );
}
