import React from 'react';

import {
  Container,
  MenuButton,
  MenuIcon,
  MenuText,
} from './styles';

interface IProps {
  section: string;
  handleSection: (section: string) => void;
}

export function OwnersFooterMenu({
  handleSection,
  section,
}: IProps) {
  return (
    <Container horizontal>
      <MenuButton
        isActive={section === 'Owners'}
        onPress={() => handleSection('Owners')}
      >
        <MenuText isActive={section === 'Owners'}>Anfitriões</MenuText>
        <MenuIcon isActive={section === 'Owners'} name="users" />
      </MenuButton>
      <MenuButton
        isActive={section === 'Main'}
        onPress={() => handleSection('Main')}
      >
        <MenuText isActive={section === 'Main'}>Principal</MenuText>
        <MenuIcon isActive={section === 'Main'} name="home" />
      </MenuButton>
      <MenuButton
        isActive={section === 'Financial'}
        onPress={() => handleSection('Financial')}
      >
        <MenuText isActive={section === 'Financial'}>Financeiro</MenuText>
        <MenuIcon isActive={section === 'Financial'} name="dollar-sign" />
      </MenuButton>
    </Container>
  );
}
