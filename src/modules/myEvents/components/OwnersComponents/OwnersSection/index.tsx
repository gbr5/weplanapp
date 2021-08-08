import React, { useState } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';

import { SectionHeader } from '../../../../../components/SectionHeader';
import { OwnersFinancialSection } from '../OwnersFinancialSection';
import { OwnersFooterMenu } from '../OwnersFooterMenu';
import { OwnersListSection } from '../OwnersListSection';
import { OwnersMainSection } from '../OwnersMainSection';

import {
  Container,
  Body,
} from './styles';

export function OwnersSection() {
  const { selectedEvent, handleSectionDescriptionWindow } = useMyEvent();

  const [section, setSection] = useState(selectedEvent.event_type === 'Prom' ? 'Main' : 'Owners');

  function handleSection(data: string) {
    setSection(data);
  }
  function handleAddOwnerForm() {

  }
  return (
    <Container>
      <SectionHeader
        title="Anfitriões"
        handleAddButton={handleAddOwnerForm}
        handleInfoButton={handleSectionDescriptionWindow}
      />
      <Body>
        {section === 'Main' && selectedEvent.event_type === 'Prom' && <OwnersMainSection />}
        {section === 'Owners'&& <OwnersListSection />}
        {section === 'Financial' && selectedEvent.event_type === 'Prom'  && <OwnersFinancialSection />}
      </Body>
      {selectedEvent.event_type === 'Prom' && (
        <OwnersFooterMenu
          handleSection={(data: string) => handleSection(data)}
          section={section}
        />
      )}
    </Container>
  );
}
