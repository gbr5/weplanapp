import React, { useState } from 'react';
import { AddButton } from '../../../../../components/AddButton';
import { InfoButton } from '../../../../../components/InfoButton';
import { SectionHeader } from '../../../../../components/SectionHeader';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useEventMembers } from '../../../../../hooks/eventMembers';
import { MembersFinancialSection } from '../MembersFinancialSection';
import { MembersFooterMenu } from '../MembersFooterMenu';
import { MembersListSection } from '../MembersListSection';
import { MembersMainSection } from '../MembersMainSection';

import {
  Container,
  Body,
} from './styles';

export function MembersSection() {
  const noUserMemberUUID = '89890569-ed93-4bf3-b123-91813838aade';

  const { handleMemberDescriptionWindow } = useEventMembers();

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
        handleInfoButton={handleMemberDescriptionWindow}
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
