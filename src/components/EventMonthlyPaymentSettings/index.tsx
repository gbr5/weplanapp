import React, { useState } from 'react';
import IEventMonthlyPaymentAgreementDTO from '../../dtos/IEventMonthlyPaymentAgreementDTO';
import { useEventVariables } from '../../hooks/eventVariables';
import { useMyEvent } from '../../hooks/myEvent';
import Button from '../Button';
import ShortConfirmationWindow from '../ShortConfirmationWindow';
import WindowContainer from '../WindowContainer';
import { WindowHeader } from '../WindowHeader';

import { Container } from './styles';

export function EventMonthlyPaymentSettings() {
  const {
    handleEventMonthlyPaymentSettingsWindow,
    selectEventMonthlyPaymentAgreement,
    selectedEventMonthlyPaymentAgreement,
  } = useEventVariables();
  const { deleteEventMonthlyPaymentAgreementWithTransactions } = useMyEvent();

  const [deleteAllConfirmation, setDeleteAllConfirmation] = useState(false);

  function handleDeleteAllConfirmation() {
    setDeleteAllConfirmation(!deleteAllConfirmation);
    handleEventMonthlyPaymentSettingsWindow();
  }

  async function handleDeleteAll() {
    await deleteEventMonthlyPaymentAgreementWithTransactions(selectedEventMonthlyPaymentAgreement);
    selectEventMonthlyPaymentAgreement({} as IEventMonthlyPaymentAgreementDTO);
    handleDeleteAllConfirmation();
    handleEventMonthlyPaymentSettingsWindow();
  }

  return (
    // <>
      // {deleteAllConfirmation && (
        <ShortConfirmationWindow
          closeWindow={handleDeleteAllConfirmation}
          firstButtonLabel="Deletar"
          firstFunction={handleDeleteAll}
          question="Deseja deletar a mensalidade e todos os contratos e transações associados a ela?"
          secondButtonLabel="Não Deletar"
          secondFunction={handleDeleteAllConfirmation}
        />
    //   )}
    //   <WindowContainer
    //     closeWindow={handleEventMonthlyPaymentSettingsWindow}
    //     height="100%"
    //     width="100%"
    //     left="0%"
    //     top="0%"
    //     zIndex={25}
    //   >
    //     <Container>
    //       <WindowHeader overTitle="Configurações" title="Mensalidade" />
    //       <Button onPress={handleDeleteAllConfirmation}>Deletar Todos</Button>
    //       {/* <Button>Editar Todos</Button> */}
    //     </Container>
    //   </WindowContainer>
    // </>
  );
}
