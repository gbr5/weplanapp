import React, { useState } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventMembers } from '../../../../../hooks/eventMembers';
import { useFriends } from '../../../../../hooks/friends';

import { SectionHeader } from '../../../../../components/SectionHeader';
import { MembersFinancialSection } from '../MembersFinancialSection';
import { MembersFooterMenu } from '../MembersFooterMenu';
import { MembersListSection } from '../MembersListSection';
import { MembersMainSection } from '../MembersMainSection';
import { useEventVariables } from '../../../../../hooks/eventVariables';

import {
  Container,
  Body,
} from './styles';

export function MembersSection() {
  const { isOwner } = useEventVariables();
  const { handleSectionDescriptionWindow } = useMyEvent();
  const { handleAddMemberWindow } = useEventMembers();
  const { getFriends } = useFriends();

  const [section, setSection] = useState('Members');

  function handleSection(data: string) {
    setSection(data);
  }
  async function handleAddMemberForm() {
    if (isOwner) {
      await getFriends();
      handleAddMemberWindow();
    }
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
