import React, { useState } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useFriends } from '../../../../../hooks/friends';
import { useEventOwners } from '../../../../../hooks/eventOwners';
import { useEventVariables } from '../../../../../hooks/eventVariables';

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
  const { handleSectionDescriptionWindow } = useMyEvent();
  const { selectedEvent } = useEventVariables();
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
