import React from 'react';
import theme from '../../global/styles/theme';

import { Container, Icon } from './styles';

interface IProps {
  handleDelete: () => void;
  top: string;
  left?: string;
  right?: string;
}

export function DeleteButton({
  handleDelete,
  top,
  left,
  right,
}: IProps): JSX.Element {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  return (
    <Container
      onPress={handleDelete}
      style={{
        top,
        left,
        right,
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 5,
      }}
    >
      <Icon name="trash-2" />
    </Container>
  )
}
