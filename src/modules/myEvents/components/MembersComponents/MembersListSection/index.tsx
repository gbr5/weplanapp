import React, { useState } from 'react';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { MemberButton } from '../MemberButton';

import {
  Container,
  Body,
  MembersContainer,
} from './styles';

export function MembersListSection() {
  const { eventMembers } = useEventVariables();
  return (
    <Container>
      <Body>
        {eventMembers.length > 0 && (
          <MembersContainer
            data={eventMembers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const index = String(eventMembers.findIndex(member => member.id === item.id) + 1);
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
