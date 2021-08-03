import React from 'react';
import { useState } from 'react';
import { AddButton } from '../../../../../components/AddButton';
import { InfoButton } from '../../../../../components/InfoButton';
import { SectionHeader } from '../../../../../components/SectionHeader';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useEventOwners } from '../../../../../hooks/eventOwners';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { OwnersFinancialSection } from '../OwnersFinancialSection';
import { OwnersFooterMenu } from '../OwnersFooterMenu';
import { OwnersListSection } from '../OwnersListSection';
import { OwnersMainSection } from '../OwnersMainSection';

import {
  Container,
  Body,
} from './styles';

export function OwnersSection() {
  const { selectedEvent } = useMyEvent();
  const { handleOwnerDescriptionWindow } = useEventOwners();

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
        handleInfoButton={handleOwnerDescriptionWindow}
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
