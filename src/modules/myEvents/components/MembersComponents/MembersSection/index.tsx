import React, { useState } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';

import { SectionHeader } from '../../../../../components/SectionHeader';
import { MembersFinancialSection } from '../MembersFinancialSection';
import { MembersFooterMenu } from '../MembersFooterMenu';
import { MembersListSection } from '../MembersListSection';
import { MembersMainSection } from '../MembersMainSection';

import {
  Container,
  Body,
} from './styles';

export function MembersSection() {
  const { handleSectionDescriptionWindow } = useMyEvent();

  const [section, setSection] = useState('Main');

  function handleSection(data: string) {
    setSection(data);
  }
  function handleAddMemberForm() {

  }
  return (
    <Container>
      <SectionHeader
        handleAddButton={handleAddMemberForm}
        handleInfoButton={handleSectionDescriptionWindow}
        title="Membros"
      />
      <Body>
        {section === 'Main' && <MembersMainSection />}
        {section === 'Members' && <MembersListSection />}
        {section === 'Financial' && <MembersFinancialSection />}
      </Body>
      <MembersFooterMenu
        handleSection={(data: string) => handleSection(data)}
        section={section}
      />
    </Container>
  );
}
