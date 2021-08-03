import React from 'react';
import { useState } from 'react';
import { MenuBooleanButton } from '../../../../components/MenuBooleanButton';
import { SectionHeader } from '../../../../components/SectionHeader';

import { Container } from './styles';

export function FriendsSection() {
  const [groupSection, setGroupSection] = useState(false);
  function handleGroupSection() {
    setGroupSection(!groupSection);
  }
  return (
    <Container>
      <SectionHeader
        handleInfoButton={() => {}}
        handleAddButton={() => {}}
        title="Contatos"
      />
      <MenuBooleanButton
        firstActive={groupSection}
        firstFunction={() => {}}
        firstLabel="Grupos"
        secondFunction={() => {}}
        secondLabel="Contatos"
      />

    </Container>
  );
}
