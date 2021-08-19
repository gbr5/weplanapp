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

export function MembersFooterMenu({
  handleSection,
  section,
}: IProps) {
  return (
    <Container horizontal>
      <MenuButton
        isActive={section === 'Members'}
        onPress={() => handleSection('Members')}
      >
        <MenuText isActive={section === 'Members'}>Membros</MenuText>
        <MenuIcon isActive={section === 'Members'} name="users" />
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
