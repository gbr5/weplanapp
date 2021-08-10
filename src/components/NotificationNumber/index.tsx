import React from 'react';

import { Container, Number } from './styles';

interface IProps {
  number: number;
  zIndex?: number;
  top?: string;
  left?: string;
}

export function NotificationNumber({
  number,
  left,
  zIndex,
  top,
}: IProps) {
  return (
    <Container
      style={{
        zIndex,
        left,
        top,
      }}
    >
      <Number>
        {number}
      </Number>
    </Container>
  );
}
