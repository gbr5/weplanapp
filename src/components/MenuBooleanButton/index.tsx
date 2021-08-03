import React from 'react';

import {
  Container,
  MenuButton,
  MenuText,
} from './styles';

interface IProps {
  firstActive: boolean;
  firstLabel: string;
  firstFunction: () => void;
  secondLabel: string;
  secondFunction: () => void;
}

export function MenuBooleanButton({
  firstActive,
  firstFunction,
  firstLabel,
  secondFunction,
  secondLabel,
}: IProps) {
  return (
    <Container>
      <MenuButton onPress={firstFunction} isActive={firstActive}>
        <MenuText isActive={firstActive}>{firstLabel}</MenuText>
      </MenuButton>
      <MenuButton onPress={secondFunction} isActive={!firstActive}>
        <MenuText isActive={!firstActive}>{secondLabel}</MenuText>
      </MenuButton>
    </Container>
  );
}
