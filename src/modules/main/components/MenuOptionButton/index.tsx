import React from 'react';
import theme from '../../../../global/styles/theme';

import {
  Container,
  Icon,
  Text,
} from './styles';

interface IProps {
  text: string;
  icon: string;
  color: string;
  onPress: () => void;
}

export function MenuOptionButton({
  text,
  icon,
  color,
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
      }}
      color={color} onPress={onPress}
    >
      <Text>{text}</Text>
      <Icon name={icon} color={color} />
    </Container>
  );
}
