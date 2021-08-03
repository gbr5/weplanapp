import React from 'react';
import { useState } from 'react';
import { AddButton } from '../../../../../components/AddButton';
import { InfoButton } from '../../../../../components/InfoButton';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { OwnerButton } from '../OwnerButton';
import { OwnersFooterMenu } from '../OwnersFooterMenu';

import {
  Container,
  Body,
  OwnersContainer,
} from './styles';

export function OwnersListSection() {
  const { owners } = useMyEvent();

  return (
    <Container>
      <Body>
        {owners.length > 0 && (
          <OwnersContainer
            data={owners}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const index = String(owners.findIndex(owner => owner.id === item.id) + 1);
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
