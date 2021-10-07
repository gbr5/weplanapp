import React, { useMemo, useState } from 'react';
import { addDays } from 'date-fns';

import { formatBrlCurrency } from '../../utils/formatBrlCurrency';

import { useMyEvent } from '../../hooks/myEvent';
import { useTransaction } from '../../hooks/transactions';
import { useEventVariables } from '../../hooks/eventVariables';

import { NewTransaction } from '../../components/NewTransaction';
import WindowContainer from '../../components/WindowContainer';
import { EditNewTransactionDueDate } from '../../components/TransactionComponents/EditNewTransactionDueDate';
import { WindowHeader } from '../WindowHeader';
import ICreateEventParticipantsMonthlyPaymentAgreementsDTO from '../../dtos/ICreateEventParticipantsMonthlyPaymentAgreementsDTO';
import IMonthlyPaymentParticipantDTO from '../../dtos/IMonthlyPaymentParticipantDTO';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionDTO';

import {
  Container,
  TransactionContainer,
  Value,
  EditButton,
  Underline,
  EndButton,
  EditText,
  EditIcon,
  CancelButton,
  ButtonContainer,
  ResumeContainer,
  ResumeTitle,
} from './styles';

export function NewEventMonthlyPaymentConfirmation() {
  const { calculateTotalEventCost } = useMyEvent();
  const {
    handleNewEventMonthlyPaymentConfirmation,
    handleNewMonthlyPaymentAgreementVariables,
    handleSelectMonthlyPaymentAgreementParticipantWindow,
    newMonthlyPaymentAgreementVariables,
    handleSelectedParticipants,
    selectedParticipants,
    selectedEvent,
    handleSelectedDate,
    selectedDate,
  } = useEventVariables();
  const {
    createEventParticipantMonthlyPaymentAgreements,
    editNewTransactionDueDateWindow,
    selectedNewTransaction,
    selectNewTransactions,
    newTransactions,
  } = useTransaction();

  const [loading, setLoading] = useState(false);

  function handleCloseWindow() {
    handleNewMonthlyPaymentAgreementVariables({} as ICreateEventParticipantsMonthlyPaymentAgreementsDTO);
    handleSelectedDate(addDays(new Date(), 3));
    handleNewEventMonthlyPaymentConfirmation();
    handleSelectMonthlyPaymentAgreementParticipantWindow();
  }

  const { newContractValue, newParticipants } = useMemo(() =>{
    const contractValue = newTransactions.length > 0
      ? newTransactions
        .map(({ amount }) => Number(amount))
        .reduce((acc, cv) => acc + cv)
      : 0;
    const participants: IMonthlyPaymentParticipantDTO[] = selectedParticipants.map(({
      participant_id,
      participant_type,
      participant_name,
    }) => {
      const transactions: ICreateTransactionDTO[] = [];
      let i = 1;
      newTransactions.length > 0 && newTransactions.sort((a, b) => {
        if (new Date(a.due_date) > new Date(b.due_date)) return 1;
        if (new Date(a.due_date) < new Date(b.due_date)) return -1;
        return 0;
      }).map(transaction => {
        transactions.push({
          amount: Number(transaction.amount),
          due_date: transaction.due_date,
          isPaid: transaction.isPaid,
          name: `${participant_name} | ${newMonthlyPaymentAgreementVariables.name} - ${i}/${newTransactions.length}`,
          payee_id: transaction.payee_id === selectedEvent.id ? selectedEvent.id : participant_id,
          payer_id: transaction.payee_id === selectedEvent.id ? participant_id : selectedEvent.id,
          category: transaction.category,
        });
        i++;
        return transaction;
      });
      return {
        participant_id,
        participant_type,
        transactions,
      };
    });
    return {
      newContractValue: contractValue,
      newParticipants: participants,
    };
  }, [newTransactions, selectedParticipants]);

  async function handleSubmit() {
    try {
      setLoading(true);
      await createEventParticipantMonthlyPaymentAgreements({
        monthly_payment: Number(newContractValue) / Number(newTransactions.length),
        amount: newContractValue,
        event_id: selectedEvent.id,
        name: newMonthlyPaymentAgreementVariables.name,
        number_of_installments: Number(newTransactions.length),
        participants: newParticipants,
        start_date: newTransactions.length > 0 ? newTransactions[0].due_date : selectedDate,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      handleCloseWindow();
      calculateTotalEventCost();
      setLoading(false);
      handleSelectedParticipants([]);
      selectNewTransactions([]);
    }
  }

  return (
    <>
      {editNewTransactionDueDateWindow
        && selectedNewTransaction
        && selectedNewTransaction.amount
        && <EditNewTransactionDueDate />
      }
      <WindowContainer
        closeWindow={handleCloseWindow}
        zIndex={30}
        top="0%"
        left="0%"
        height="100%"
        width="100%"
      >
        <Container>
          <EditButton
            onPress={handleNewEventMonthlyPaymentConfirmation}
          >
            <EditText>Editar</EditText>
            <EditIcon name="edit" />
          </EditButton>
          <WindowHeader
            title="Confirmação"
            overTitle="Contrato em Grupo"
          />
          <ResumeContainer>
            <ResumeTitle>Número de participantes: </ResumeTitle>
            <ResumeTitle>{selectedParticipants.length}</ResumeTitle>
          </ResumeContainer>
          <ResumeContainer>
            <ResumeTitle>Valor da Parcela: </ResumeTitle>
            <ResumeTitle>{formatBrlCurrency(newMonthlyPaymentAgreementVariables.monthly_payment)}</ResumeTitle>
          </ResumeContainer>
          <ResumeContainer>
            <ResumeTitle>Valor por Contrato: </ResumeTitle>
            <ResumeTitle>{formatBrlCurrency(newMonthlyPaymentAgreementVariables.amount)}</ResumeTitle>
          </ResumeContainer>
          <ResumeContainer>
            <ResumeTitle>Valor Total: </ResumeTitle>
            <ResumeTitle>{formatBrlCurrency(newMonthlyPaymentAgreementVariables.amount * selectedParticipants.length)}</ResumeTitle>
          </ResumeContainer>
          <Underline />

          <TransactionContainer>
            {newTransactions.length > 0 && newTransactions.map(transaction => {
              const findIndex = String(newTransactions
                .findIndex(thisTransaction => thisTransaction.due_date === transaction.due_date)
                + 1
              );
              return (
                <NewTransaction key={findIndex} index={findIndex} transaction={transaction} />
              );
            })}
          </TransactionContainer>
        </Container>
        <ButtonContainer>
          {loading ? (
            <EditIcon name="loader" />
          ) : (
            <>
              <CancelButton
                onPress={handleNewEventMonthlyPaymentConfirmation}
                >
                <Value>Cancelar</Value>
              </CancelButton>
              <EndButton
                onPress={handleSubmit}
              >
                <Value>Confirmar</Value>
              </EndButton>
            </>
          )}
        </ButtonContainer>
      </WindowContainer>
    </>
  );
}
