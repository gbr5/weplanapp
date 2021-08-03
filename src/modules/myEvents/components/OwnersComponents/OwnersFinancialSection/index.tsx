import React, { useState } from 'react';
import { MenuBooleanButton } from '../../../../../components/MenuBooleanButton';

import {
  Container,
  MenuContainer,
  MenuButton,
  MenuTitle,
  Body,
} from './styles';

export function OwnersFinancialSection() {
  const [financialSection, setFinancialSection] = useState('Contracts');

  function handleFinancialSection(data: string) {
    setFinancialSection(data);
  }

  return (
    <Container>
      <MenuBooleanButton
        firstActive={financialSection === 'Contracts'}
        firstFunction={() => handleFinancialSection('Contracts')}
        firstLabel="Contratos"
        secondFunction={() => handleFinancialSection('Contracts')}
        secondLabel="Transações"
      />
      <Body />
    </Container>
  );
}
