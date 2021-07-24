import React from 'react';
import { addDays } from 'date-fns';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import { NewTransaction } from '../../../../../components/NewTransaction';
import WindowContainer from '../../../../../components/WindowContainer';
import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';

import {
  Container,
  Title,
  Value,
  EditButton,
  Underline,
  EndButton,
  EditText,
  EditIcon,
  SubText,
  ButtonContainer,
} from './styles';

export function NewEventSupplierTransactionAgreementConfirmation() {
  const { selectedSupplier, selectSupplier } = useMyEvent();
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
      console.log({
        amount: newAgreementAmount,
        number_of_installments: newAgreementInstallments,
        supplier_id: selectedSupplier.id,
        transactions: newTransactions,
      });
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
      top="10%"
      left="2%"
      height="85%"
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
        {newTransactions.map(transaction => {
          return (
            <NewTransaction key={String(transaction.due_date)} transaction={transaction} />
          );
        })}
      </Container>
      <ButtonContainer>
        <EndButton
          onPress={handleSubmit}
        >
          <Value>Confirmar</Value>
        </EndButton>
        <EndButton
          onPress={closeWindow}
        >
          <Value>Cancelar</Value>
        </EndButton>
      </ButtonContainer>
    </WindowContainer>
  );
}
