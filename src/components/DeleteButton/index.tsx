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
  return (
    <Container
      onPress={handleDelete}
      style={{
        top,
        left,
        right,
      }}
    >
      <Icon name="trash-2" />
    </Container>
  )
}
