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
        <MenuIcon isActive={section === 'Owners'} name="users" />
      </MenuButton>
      <MenuButton
        isActive={section === 'Main'}
        onPress={() => handleSection('Main')}
      >
        <MenuIcon isActive={section === 'Main'} name="home" />
      </MenuButton>
      <MenuButton
        isActive={section === 'Financial'}
        onPress={() => handleSection('Financial')}
      >
        <MenuIcon isActive={section === 'Financial'} name="dollar-sign" />
      </MenuButton>
    </Container>
  );
}
