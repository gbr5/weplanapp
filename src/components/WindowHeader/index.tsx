import React from 'react';

import {
  Container,
  OverTitle,
  Title,
  TitleUnderline,
} from './styles';

interface IProps {
  overTitle?: string;
  title: string;
}

export function WindowHeader({ title, overTitle }: IProps) {
  return (
    <Container>
      {overTitle && <OverTitle>{overTitle}</OverTitle>}
      <Title>{title}</Title>
      <TitleUnderline />
    </Container>
  );
}
