import React, { useEffect, useState } from 'react';
import { addDays } from 'date-fns';

import { formatBrlCurrency } from '../../utils/formatBrlCurrency';

import { useMyEvent } from '../../hooks/myEvent';
import { useTransaction } from '../../hooks/transactions';
import { useEventVariables } from '../../hooks/eventVariables';

import { EditNewTransactionAmount } from '../../components/TransactionComponents/EditNewTransactionAmount';
import { NewTransaction } from '../../components/NewTransaction';
import WindowContainer from '../../components/WindowContainer';
import { EditNewTransactionDueDate } from '../../components/TransactionComponents/EditNewTransactionDueDate';

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
} from './styles';
import { WindowHeader } from '../WindowHeader';
import { useEventOwners } from '../../hooks/eventOwners';
import { useEventMembers } from '../../hooks/eventMembers';
import { useEventSuppliers } from '../../hooks/eventSuppliers';
import IEventTransactionAgreementDTO from '../../dtos/IEventTransactionAgreementDTO';
import IEventTransactionDTO from '../../dtos/IEventTransactionDTO';

interface IProps {
  closeWindow: () => void;
  closePreviousWindow: () => void;
  participant_type: string;
  participant_id: string;
  overTitle: string;
  title: string;
}

export function NewEventTransactionAgreementConfirmation({
  closeWindow,
  participant_id,
  participant_type,
  overTitle,
  title,
  closePreviousWindow,
}: IProps) {
  const { calculateTotalEventCost } = useMyEvent();
  const {
    createTransactionAgreementWithTransactions,
    editNewTransactionValueWindow,
    editNewTransactionDueDateWindow,
    handleNewAgreement,
    handleSelectedDate,
    newAgreementAmount,
    newAgreementInstallments,
    newTransactions,
    selectNewTransactions,
    selectedNewTransaction,
    handleSelectedEventTransactionAgreements,
  } = useTransaction();

  const {
    selectedEvent,
    selectedEventOwner,
    selectedEventMember,
    selectedEventSupplier,
  } = useEventVariables();

  const {
    eventOwnerTransactionAgreementsWindow,
  } = useEventOwners();
  const {
    eventMemberTransactionAgreementsWindow,
  } = useEventMembers();
  const {
    eventSupplierAgreementTransactionsWindow,
  } = useEventSuppliers();
  const [loading, setLoading] = useState(false);

  function handleCloseWindow() {
    selectNewTransactions([]);
    handleNewAgreement({
      amount: 0,
      installments: 1,
    });
    handleSelectedDate(addDays(new Date(), 3));
    closeWindow();
    closePreviousWindow();
  }
  async function handleSubmit() {
    try {
      setLoading(true);
      await createTransactionAgreementWithTransactions({
        amount: newAgreementAmount,
        number_of_installments: newAgreementInstallments,
        participant_id,
        participant_type,
        transactions: newTransactions,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      closeWindow();
      calculateTotalEventCost();
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedEventOwner && selectedEventOwner.id && eventOwnerTransactionAgreementsWindow) {
      const agreements: IEventTransactionAgreementDTO[] = [];
      const ownerAgreements = selectedEventOwner.transactionAgreements ?? [];
      ownerAgreements && ownerAgreements.length > 0 && ownerAgreements.map(({
        amount,
        created_at,
        id,
        isCancelled,
        number_of_installments,
        owner_id,
        transactions,
        updated_at,
      }) => {
        const eventTransactions: IEventTransactionDTO[] = transactions.length > 0
          ? transactions.map(({ transaction }) => {
            return {
              agreement_id: id,
              agreement_type: 'owner',
              event_id: selectedEvent.id,
              transaction,
            };
          })
          : [];
          agreements.push({
            amount,
            created_at,
            event_id: selectedEvent.id,
            id,
            isCancelled,
            number_of_installments,
            participant_id: owner_id,
            participant_type: 'owner',
            transactions: eventTransactions,
            updated_at,
          })
        });
        agreements &&
          agreements.length > 0 &&
            handleSelectedEventTransactionAgreements(agreements);
    }
  }, [selectedEventOwner]);
  useEffect(() => {
    if (selectedEventMember && selectedEventMember.id && eventMemberTransactionAgreementsWindow) {
      const agreements: IEventTransactionAgreementDTO[] = [];
      const memberAgreements = selectedEventMember.transactionAgreements ?? [];
      memberAgreements && memberAgreements.length > 0 && memberAgreements.map(({
        amount,
        created_at,
        id,
        isCancelled,
        number_of_installments,
        member_id,
        transactions,
        updated_at,
      }) => {
        const eventTransactions: IEventTransactionDTO[] = transactions.length > 0
          ? transactions.map(({ transaction }) => {
            return {
              agreement_id: id,
              agreement_type: 'member',
              event_id: selectedEvent.id,
              transaction,
            };
          })
          : [];
        agreements.push({
          amount,
          created_at,
          event_id: selectedEvent.id,
          id,
          isCancelled,
          number_of_installments,
          participant_id: member_id,
          participant_type: 'member',
          transactions: eventTransactions,
          updated_at,
        })
      });
      agreements &&
        agreements.length > 0 &&
          handleSelectedEventTransactionAgreements(agreements);
    }
  }, [selectedEventMember]);
  useEffect(() => {
    if (selectedEventSupplier && selectedEventSupplier.id && eventSupplierAgreementTransactionsWindow) {
      const agreements: IEventTransactionAgreementDTO[] = [];
      const supplierAgreements = selectedEventSupplier.transactionAgreements ?? [];
      supplierAgreements && supplierAgreements.length > 0 && supplierAgreements.map(({
        amount,
        created_at,
        id,
        isCancelled,
        number_of_installments,
        supplier_id,
        transactions,
        updated_at,
      }) => {
        const eventTransactions: IEventTransactionDTO[] = transactions.length > 0
          ? transactions.map(({ transaction }) => {
            return {
              agreement_id: id,
              agreement_type: 'supplier',
              event_id: selectedEvent.id,
              transaction,
            };
          })
          : [];
        agreements.push({
          amount,
          created_at,
          event_id: selectedEvent.id,
          id,
          isCancelled,
          number_of_installments,
          participant_id: supplier_id,
          participant_type: 'supplier',
          transactions: eventTransactions,
          updated_at,
        })
      });
      agreements &&
        agreements.length > 0 &&
          handleSelectedEventTransactionAgreements(agreements);
    }
  }, [selectedEventSupplier]);
  // function handleGoBack() {
  // handleNewEventTransactionAgreement();
  // }

  return (
    <>
      {editNewTransactionValueWindow
        && selectedNewTransaction
        && selectedNewTransaction.amount
        && <EditNewTransactionAmount />
      }
      {editNewTransactionDueDateWindow
        && selectedNewTransaction
        && selectedNewTransaction.amount
        && <EditNewTransactionDueDate />
      }

      <WindowContainer
        closeWindow={handleCloseWindow}
        zIndex={20}
        top="5%"
        left="2%"
        height="95%"
        width="96%"
      >
        <Container>
          <EditButton
            onPress={closeWindow}
          >
            <EditText>Editar</EditText>
            <EditIcon name="edit" />
          </EditButton>
          {/* <Title>Contrato com {selectedEvent.name}</Title> */}
          {/* <Underline /> */}
          <WindowHeader
            title={title}
            overTitle={overTitle}
          />
          <Value>Total: {formatBrlCurrency(newAgreementAmount)}</Value>

          {/* <SubText>Nº  |      Parcela      |  Data  |  Pago</SubText> */}
          <Underline />

          <TransactionContainer>
            {newTransactions.map(transaction => {
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
                onPress={closeWindow}
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
