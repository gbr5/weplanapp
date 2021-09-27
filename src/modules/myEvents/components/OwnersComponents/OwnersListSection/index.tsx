import React from 'react';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { OwnerButton } from '../OwnerButton';

import {
  Container,
  Body,
  OwnersContainer,
} from './styles';

export function OwnersListSection() {
  const { eventOwners } = useEventVariables();

  return (
    <Container>
      <Body>
        {eventOwners.length > 0 && (
          <OwnersContainer
            data={eventOwners}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const index = String(eventOwners.findIndex(owner => owner.id === item.id) + 1);
              return (
                <OwnerButton
                  key={item.id}
                  index={index}
                  owner={item}
                />
              );
            }}
          />
        )}
      </Body>
    </Container>
  );
}
