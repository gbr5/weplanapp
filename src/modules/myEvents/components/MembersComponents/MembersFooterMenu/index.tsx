import React from 'react';

import {
  Container,
  MenuButton,
  MenuIcon,
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
    <Container>
      <MenuButton
        isActive={section === 'Members'}
        onPress={() => handleSection('Members')}
      >
        <MenuIcon isActive={section === 'Members'} name="users" />
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
