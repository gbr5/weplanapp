import React, { useState, useMemo } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useTransaction } from '../../../../../hooks/transactions';

import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import IUpdateEventSupplierTransactionAgreementDTO from '../../../../../dtos/IUpdateEventSupplierTransactionAgreementDTO';
import ITransactionDTO from '../../../../../dtos/ITransactionDTO';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { SelectTransactionButton } from '../../../../../components/TransactionComponents/SelectTransactionButton';
import ShortConfirmationWindow from '../../../../../components/ShortConfirmationWindow';
import Button from '../../../../../components/Button';

import {
  Container,
  Title,
  TransactionsContainer,
} from './styles';

export function CancelNotPaidTransactionsWindow() {
  const { selectedSupplier } = useMyEvent();
  const {
    supplierTransactions,
    handleCancelNotPaidTransactionsWindow,
    handleDischargingWindow,
    updateEventSupplier,
  } = useEventSuppliers();
  const { updateEventSupplierTransactionAgreement } = useTransaction();

  const [deleteNotPaidTransactionsConfirmationWindow, setDeleteNotPaidTransactionsConfirmationWindow] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<ITransactionDTO[]>([]);

  function selectTransactions(data: ITransactionDTO[]) {
    setSelectedTransactions(data);
  }

  function cancelAgreementNotPaidTransactions({
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
      const updatedAgreement = cancelAgreementNotPaidTransactions(agreement);
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
    setDeleteNotPaidTransactionsConfirmationWindow(false);
    handleCancelNotPaidTransactionsWindow();
    handleDischargingWindow();
  }

  const transactions = useMemo(() => {
    if (supplierTransactions && supplierTransactions.length > 0) {
      const updatedTransactions = supplierTransactions.filter(transaction => !transaction.isCancelled && !transaction.isPaid);
      setSelectedTransactions(updatedTransactions);
      return updatedTransactions;
    }
  }, [supplierTransactions]);

  function handleDeleteAllConfirmationWindow() {
    setDeleteNotPaidTransactionsConfirmationWindow(!deleteNotPaidTransactionsConfirmationWindow);
  }

  return (
    <WindowContainer
      closeWindow={handleCancelNotPaidTransactionsWindow}
      zIndex={36}
      top="5%"
      left="0%"
      height="95%"
      width="100%"
    >
      {deleteNotPaidTransactionsConfirmationWindow && (
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
        <WindowHeader title="Cancelar Transações Não Paga" />

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
                    selectTransactions={(data: ITransactionDTO[]) => selectTransactions(data)}
                    selectedTransactions={selectedTransactions}
                    index={index}
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
