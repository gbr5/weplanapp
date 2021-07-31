import React from 'react';
import { useState } from 'react';
import { AddButton } from '../../../../../components/AddButton';
import { InfoButton } from '../../../../../components/InfoButton';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { OwnersFooterMenu } from '../OwnersFooterMenu';

import {
  Container,
  Body,
} from './styles';

export function OwnersFinancialSection() {
  const [section, setSection] = useState('Main');

  function handleSection(data: string) {
    setSection(data);
  }
  function handleAddOwnerForm() {

  }
  return (
    <Container>
      <WindowHeader title="Financeiro" />
      <Body />
    </Container>
  );
}
