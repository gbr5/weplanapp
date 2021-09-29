import React, { useState } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventMembers } from '../../../../../hooks/eventMembers';
import { useFriends } from '../../../../../hooks/friends';
import { useEventVariables } from '../../../../../hooks/eventVariables';

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
  const { selectedEvent } = useEventVariables();
  const { handleAddMemberWindow } = useEventMembers();
  const { getFriends } = useFriends();

  const [section, setSection] = useState('Members');

  function handleSection(data: string) {
    setSection(data);
  }
  async function handleAddMemberForm() {
    await getFriends();
    handleAddMemberWindow();
  }
  return (
    <Container>
      <SectionHeader
        handleAddButton={handleAddMemberForm}
        handleInfoButton={handleSectionDescriptionWindow}
        title="Membros"
      />
      <MembersFooterMenu
        handleSection={(data: string) => handleSection(data)}
        section={section}
      />
      <Body>
        {section === 'Members' && <MembersListSection />}
        {section === 'Main' && <MembersMainSection />}
        {section === 'Financial' && <MembersFinancialSection />}
      </Body>
    </Container>
  );
}
