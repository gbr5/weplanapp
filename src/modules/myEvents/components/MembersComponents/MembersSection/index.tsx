import React, { useState } from 'react';
import { AddButton } from '../../../../../components/AddButton';
import { InfoButton } from '../../../../../components/InfoButton';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { MembersFinancialSection } from '../MembersFinancialSection';
import { MembersFooterMenu } from '../MembersFooterMenu';
import { MembersListSection } from '../MembersListSection';
import { MembersMainSection } from '../MembersMainSection';

import {
  Container,
  Body,
} from './styles';

export function MembersSection() {
  const [section, setSection] = useState('Main');

  function handleSection(data: string) {
    setSection(data);
  }
  function handleAddMemberForm() {

  }
  return (
    <Container>
      <InfoButton
        onPress={handleAddMemberForm}
        top="0%"
        left="2%"
      />
      <WindowHeader title="Membros" />
      <AddButton
        onPress={handleAddMemberForm}
        top="0%"
        right="2%"
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
