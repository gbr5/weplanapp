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
import { useEventMembers } from '../../../../../hooks/eventMembers';
import { useFriends } from '../../../../../hooks/friends';

export function MembersSection() {
  const { selectedEvent, handleSectionDescriptionWindow } = useMyEvent();
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
      <Body>
        {section === 'Members' && <MembersListSection />}
        {section === 'Main' && <MembersMainSection />}
        {section === 'Financial' && <MembersFinancialSection />}
      </Body>
      <MembersFooterMenu
        handleSection={(data: string) => handleSection(data)}
        section={section}
      />
    </Container>
  );
}
