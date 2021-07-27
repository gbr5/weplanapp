import React from 'react';
import { addDays } from 'date-fns';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';

import { NewTransaction } from '../../../../../components/NewTransaction';
import WindowContainer from '../../../../../components/WindowContainer';

import {
  Container,
  TransactionContainer,
  Title,
  Value,
  EditButton,
  Underline,
  EndButton,
  EditText,
  EditIcon,
  SubText,
  CancelButton,
  ButtonContainer,
} from './styles';
import { useState } from 'react';

export function NewEventSupplierTransactionAgreementConfirmation() {
  const { selectedSupplier, selectSupplier, calculateTotalEventCost } = useMyEvent();
  const {
    handleCreateSupplierTransactionsWindow,
  } = useEventSuppliers();
  const {
    newAgreementAmount,
    newAgreementInstallments,
    newTransactions,
    handleNewEventSupplierTransactionAgreement,
    createSupplierTransactionAgreementWithTransactions,
    selectNewTransactions,
    handleNewAgreement,
    handleSelectedDate,
  } = useTransaction();

  const [loading, setLoading] = useState(false);

  function closeWindow() {
    selectNewTransactions([]);
    handleNewAgreement({
      amount: 0,
      installments: 1,
    });
    handleNewEventSupplierTransactionAgreement();
    selectSupplier({} as IEventSupplierDTO);
    handleSelectedDate(addDays(new Date(), 3));
  }
  async function handleSubmit() {
    try {
      setLoading(true);
      await createSupplierTransactionAgreementWithTransactions({
        amount: newAgreementAmount,
        number_of_installments: newAgreementInstallments,
        supplier_id: selectedSupplier.id,
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

  function handleGoBack() {
    handleNewEventSupplierTransactionAgreement();
    handleCreateSupplierTransactionsWindow();
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={30}
      top="5%"
      left="2%"
      height="95%"
      width="96%"
    >
      <Container>
        <EditButton
          onPress={handleGoBack}
        >
          <EditText>Editar</EditText>
          <EditIcon name="edit" />
        </EditButton>
        <Title>Contrato com {selectedSupplier.name}</Title>
        <Underline />
        <Value>Total: {formatBrlCurrency(newAgreementAmount)}</Value>
        <SubText>{newAgreementInstallments} parcelas de {formatBrlCurrency(newAgreementAmount/newAgreementInstallments)}</SubText>
        <SubText>Nº  |      Parcela      |  Data  |  Pago</SubText>
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
  );
}
