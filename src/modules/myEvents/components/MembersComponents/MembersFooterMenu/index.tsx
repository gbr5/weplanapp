import React, { useEffect, useMemo } from 'react';
import { useEventVariables } from '../../../../../hooks/eventVariables';

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
  const { isOwner, selectedEvent } = useEventVariables();

  const mainSectionAccess = useMemo(() => {
    return isOwner || selectedEvent.isNumberOfGuestsRestricted;
  }, [isOwner, selectedEvent.isNumberOfGuestsRestricted]);

  return (
    <Container>
      <MenuButton
        isActive={section === 'Members'}
        onPress={() => handleSection('Members')}
      >
        <MenuIcon isActive={section === 'Members'} name="users" />
      </MenuButton>
      {mainSectionAccess && (
        <MenuButton
          isActive={section === 'Main'}
          onPress={() => handleSection('Main')}
        >
          <MenuIcon isActive={section === 'Main'} name="home" />
        </MenuButton>
      )}
      <MenuButton
        isActive={section === 'Financial'}
        onPress={() => handleSection('Financial')}
      >
        <MenuIcon isActive={section === 'Financial'} name="dollar-sign" />
      </MenuButton>
    </Container>
  );
}
