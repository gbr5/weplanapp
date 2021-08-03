import React from 'react';
import { useState } from 'react';
import { AddButton } from '../../../../../components/AddButton';
import { InfoButton } from '../../../../../components/InfoButton';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { MemberButton } from '../MemberButton';

import {
  Container,
  Body,
  MembersContainer,
} from './styles';

export function MembersListSection() {
  const {
    members,
  } = useMyEvent();
  const [section, setSection] = useState('Main');

  function handleSection(data: string) {
    setSection(data);
  }
  function handleAddOwnerForm() {

  }
  return (
    <Container>
      <Body>
        {members.length > 0 && (
          <MembersContainer
            data={members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const index = String(members.findIndex(member => member.id === item.id) + 1);
              return (
                <MemberButton
                  index={index}
                  member={item}
                />
              );
            }}
          />
        )}
      </Body>
    </Container>
  );
}
