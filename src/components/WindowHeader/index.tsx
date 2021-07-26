import React from 'react';

import {
  Container,
  Title,
  TitleUnderline,
} from './styles';

interface IProps {
  title: string;
}

export function WindowHeader({ title }: IProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <TitleUnderline />
    </Container>
  );
}
