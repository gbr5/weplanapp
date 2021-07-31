import React from 'react';
import { useState } from 'react';
import { AddButton } from '../../../../../components/AddButton';
import { InfoButton } from '../../../../../components/InfoButton';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { OwnersFinancialSection } from '../OwnersFinancialSection';
import { OwnersFooterMenu } from '../OwnersFooterMenu';
import { OwnersListSection } from '../OwnersListSection';
import { OwnersMainSection } from '../OwnersMainSection';

import {
  Container,
  Body,
} from './styles';

export function OwnersSection() {
  const [section, setSection] = useState('Main');

  function handleSection(data: string) {
    setSection(data);
  }
  function handleAddOwnerForm() {

  }
  return (
    <Container>
      <InfoButton
        onPress={handleAddOwnerForm}
        top="0%"
        left="2%"
      />
      <WindowHeader title="Anfitriões" />
      <AddButton
        onPress={handleAddOwnerForm}
        top="0%"
        right="2%"
      />
      <Body>
        {section === 'Main' && <OwnersMainSection />}
        {section === 'Owners' && <OwnersListSection />}
        {section === 'Financial' && <OwnersFinancialSection />}
      </Body>
      <OwnersFooterMenu
        handleSection={(data: string) => handleSection(data)}
        section={section}
      />
    </Container>
  );
}
