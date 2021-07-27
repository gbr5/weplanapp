import React, { useState, useMemo } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useTransaction } from '../../../../../hooks/transactions';

import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import IUpdateEventSupplierTransactionAgreementDTO from '../../../../../dtos/IUpdateEventSupplierTransactionAgreementDTO';
import ITransactionDTO from '../../../../../dtos/ITransactionDTO';

import { SelectTransactionButton } from '../../../../../components/TransactionComponents/SelectTransactionButton';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import ShortConfirmationWindow from '../../../../../components/ShortConfirmationWindow';
import Button from '../../../../../components/Button';

import {
  Container,
  Title,
  TransactionsContainer,
} from './styles';

export function CancelFutureTransactionsWindow() {
  const { selectedSupplier } = useMyEvent();
  const {
    supplierTransactions,
    handleCancelFutureTransactionsWindow,
    handleDischargingWindow,
    updateEventSupplier,
  } = useEventSuppliers();
  const { updateEventSupplierTransactionAgreement } = useTransaction();

  const today = new Date();
  const [deleteFutureTransactionsConfirmationWindow, setDeleteFutureTransactionsConfirmationWindow] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<ITransactionDTO[]>([]);

  function selectTransactions(data: ITransactionDTO[]) {
    setSelectedTransactions(data);
  }

  function cancelAgreementSelectedTransactions({
    id,
    transactions,
  }: IEventSupplierTransactionAgreementDTO) {
    const updatedTransactions = transactions.map(transaction => {
      if (selectedTransactions.find(item => item.id === transaction.transaction.id)) {
        return {
          ...transaction.transaction,
          isCancelled: true,
        }
      }
      return transaction.transaction;
    });
    const newAmount = updatedTransactions
      .filter(transaction => !transaction.isCancelled)
      .map(transaction => Number(transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);
    const newNumberOfInstallments = updatedTransactions
      .filter(transaction => !transaction.isCancelled).length;
    return {
      id,
      amount: newAmount,
      number_of_installments: newNumberOfInstallments,
      isCancelled: newAmount === 0,
      transactions: updatedTransactions,
    }
  }

  async function handleDeleteSelectedTransactios() {
    const agreements: IUpdateEventSupplierTransactionAgreementDTO[] = [];
    selectedSupplier.transactionAgreements.map(agreement => {
      const updatedAgreement = cancelAgreementSelectedTransactions(agreement);
      agreements.push(updatedAgreement);
      return updatedAgreement;
    });
    Promise.all([
      agreements.map(agreement => {
        return updateEventSupplierTransactionAgreement(agreement);
      }),
    ]);
    await updateEventSupplier({
      ...selectedSupplier,
      isDischarged: true,
      isHired: false,
    });
    setDeleteFutureTransactionsConfirmationWindow(false);
    handleCancelFutureTransactionsWindow();
    handleDischargingWindow();
  }

  const transactions = useMemo(() => {
    if (supplierTransactions && supplierTransactions.length > 0) {
      const updatedTransactions = supplierTransactions.filter(transaction =>
        new Date(transaction.due_date) > today,
      );
      setSelectedTransactions(updatedTransactions.filter(transaction => !transaction.isPaid));
      return updatedTransactions;
    }
  }, [supplierTransactions]);

  function handleDeleteAllConfirmationWindow() {
    setDeleteFutureTransactionsConfirmationWindow(!deleteFutureTransactionsConfirmationWindow);
  }

  return (
    <WindowContainer
      closeWindow={handleCancelFutureTransactionsWindow}
      zIndex={36}
      top="5%"
      left="0%"
      height="95%"
      width="100%"
    >
      {deleteFutureTransactionsConfirmationWindow && (
        <ShortConfirmationWindow
          closeWindow={handleDeleteAllConfirmationWindow}
          question="Deseja deletar tudo?"
          firstButtonLabel="Deletar"
          firstFunction={handleDeleteSelectedTransactios}
          secondButtonLabel="Cancelar"
          secondFunction={handleDeleteAllConfirmationWindow}
        />
      )}
      <Container>
        <WindowHeader title="Cancelar Transações Futuras" />

        <Title>Selecione as transações que deseja cancelar</Title>

        {transactions
          && transactions.length > 0 && (
            <TransactionsContainer
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const index = String(transactions.findIndex(transaction => transaction.id === item.id) + 1);
                return (
                  <SelectTransactionButton
                    index={index}
                    selectTransactions={(data: ITransactionDTO[]) => selectTransactions(data)}
                    selectedTransactions={selectedTransactions}
                    transaction={item}
                    key={index}
                  />
              )}}
            />
          )}
      </Container>
      <Button onPress={handleDeleteAllConfirmationWindow}>Cancelar Transações</Button>
    </WindowContainer>
  );
}
