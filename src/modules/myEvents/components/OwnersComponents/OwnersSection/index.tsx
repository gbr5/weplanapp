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
import { useFriends } from '../../../../../hooks/friends';
import { useEventOwners } from '../../../../../hooks/eventOwners';

export function OwnersSection() {
  const { selectedEvent, handleSectionDescriptionWindow } = useMyEvent();
  const { handleAddOwnerWindow } = useEventOwners();
  const { getFriends } = useFriends();

  const [section, setSection] = useState('Owners');

  function handleSection(data: string) {
    setSection(data);
  }
  async function handleAddOwnerForm() {
    await getFriends();
    handleAddOwnerWindow();
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
