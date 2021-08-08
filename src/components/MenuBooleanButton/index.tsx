import React from 'react';
import theme from '../../global/styles/theme';

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
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.buttonShadow;
  return (
    <Container>
      <MenuButton
        style={!firstActive && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
        onPress={firstFunction}
        isActive={firstActive}
      >
       <MenuText isActive={firstActive}>{firstLabel}</MenuText>
      </MenuButton>
      <MenuButton
        style={firstActive && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
        onPress={secondFunction}
        isActive={!firstActive}
      >
        <MenuText isActive={!firstActive}>{secondLabel}</MenuText>
      </MenuButton>
    </Container>
  );
}
