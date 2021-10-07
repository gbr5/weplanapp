import React from 'react';
import { useEventVariables } from '../../hooks/eventVariables';
import Button from '../Button';
import { SelectParticipantsFlatList } from '../SelectParticipantsFlatList';
import WindowContainer from '../WindowContainer';
import { WindowHeader } from '../WindowHeader';

import { Container } from './styles';

export function SelectMonthlyPaymentAgreementParticipant() {
  const {
    handleSelectMonthlyPaymentAgreementParticipantWindow,
    handleCreateMonthlyPaymentAgreementWindow,
  } = useEventVariables();

  return (
    <WindowContainer
      closeWindow={handleSelectMonthlyPaymentAgreementParticipantWindow}
      zIndex={25}
      top="0%"
      left="0%"
      height="100%"
      width="100%"
    >
      <Container>
        <WindowHeader
          overTitle="Mensalidade"
          title="Participantes"
        />

        <SelectParticipantsFlatList />
        <Button onPress={handleCreateMonthlyPaymentAgreementWindow} >Próximo</Button>
      </Container>
    </WindowContainer>
  );
}
