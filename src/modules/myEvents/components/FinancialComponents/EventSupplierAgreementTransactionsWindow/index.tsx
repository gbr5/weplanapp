import React, { useState, useMemo } from 'react';
import { Alert } from 'react-native';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useTransaction } from '../../../../../hooks/transactions';
import { useEventVariables } from '../../../../../hooks/eventVariables';

import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import ITransactionDTO from '../../../../../dtos/ITransactionDTO';
import IEventSupplierTransactionDTO from '../../../../../dtos/IEventSupplierTransactionDTO';

import ShortConfirmationWindow from '../../../../../components/ShortConfirmationWindow';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { EventTransactionButton } from '../../../../../components/TransactionComponents/EventTransactionButton';
import Button from '../../../../../components/Button';

import {
  Container,
  Title,
  TransactionsContainer,
} from './styles';

export function EventSupplierAgreementTransactionsWindow() {
  const { eventSuppliers } = useEventVariables();
  const {
    selectSupplierTransaction,
    selectSupplierTransactionAgreement,
    selectedSupplierTransactionAgreement,
    handleEventSupplierAgreementTransactionsWindow,
  } = useEventSuppliers();
  const {
    selectTransaction,
    updateEventSupplierTransactionAgreement,
    handleEventTransactions,
  } = useTransaction();

  const [cancelAgreementConfirmationWindow, setCancelAgreementConfirmationWindow] = useState(false);

  const supplier = useMemo(() => {
    return eventSuppliers.find(item => item.id === selectedSupplierTransactionAgreement.supplier_id);
  }, []);

  function closeWindow() {
    handleEventSupplierAgreementTransactionsWindow();
    selectSupplierTransaction({} as IEventSupplierTransactionDTO);
    selectSupplierTransactionAgreement({} as IEventSupplierTransactionAgreementDTO);
  }

  function handleCancelAgreementConfirmationWindow() {
    setCancelAgreementConfirmationWindow(!cancelAgreementConfirmationWindow);
  }

  async function cancelAgreementAndTransactions() {
    if (selectedSupplierTransactionAgreement) {
      const updatedTransactions = selectedSupplierTransactionAgreement.transactions
        .map(({ transaction }) => {
          return {
            ...transaction,
            isCancelled: true,
          };
        });

      const updatedAgreement = {
        id: selectedSupplierTransactionAgreement.id,
        amount: 0,
        number_of_installments: 0,
        isCancelled: true,
        transactions: updatedTransactions,
      };
      selectTransaction({} as ITransactionDTO);
      await updateEventSupplierTransactionAgreement(updatedAgreement);
      closeWindow();
      Alert.alert(`Contrato e transações cancelados com sucesso!`);
    }
  }

  const agreementAmount = useMemo(() => {
    return formatBrlCurrency(selectedSupplierTransactionAgreement.amount);
  }, [selectedSupplierTransactionAgreement]);

  const transactions = useMemo(() => {
    if (selectedSupplierTransactionAgreement.transactions.length > 0)
      return handleEventTransactions(selectedSupplierTransactionAgreement.transactions
        .filter(agreementTransaction => !agreementTransaction.transaction.isCancelled)
        .map(({ transaction }) => transaction));
  }, [selectedSupplierTransactionAgreement.transactions]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={16}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      {cancelAgreementConfirmationWindow && (
        <ShortConfirmationWindow
          closeWindow={handleCancelAgreementConfirmationWindow}
          question="Deseja deletar o contrato e suas transações?"
          firstButtonLabel="Deletar"
          firstFunction={cancelAgreementAndTransactions}
          secondButtonLabel="Não Deletar"
          secondFunction={handleCancelAgreementConfirmationWindow}
        />
      )}
      <Container>
        <WindowHeader
          overTitle={`Fornecedor: ${supplier && supplier.name}`}
          title="Transações"
        />

        <Title>Valor Total:  {agreementAmount}</Title>

        {transactions
          && transactions.length > 0 && (
            <TransactionsContainer
              data={transactions}
              keyExtractor={({ transaction }) => transaction.id}
              renderItem={({ item }) => {
                const index = String(transactions
                  .findIndex(({ transaction }) => transaction.id === item.transaction.id) + 1);
                  const year = new Date(item.transaction.due_date).getFullYear();
                  const month = new Date(item.transaction.due_date).getMonth();
                  const date = new Date(item.transaction.due_date).getDate();

                  const firstOfYear = transactions
                    .filter(({ transaction }) =>
                      new Date(transaction.due_date).getFullYear() === year
                    )[0].transaction.id === item.transaction.id;
                  const firstOfDay = transactions
                    .filter(({ transaction }) =>
                      new Date(transaction.due_date).getFullYear() === year
                      && new Date(transaction.due_date).getMonth() === month
                      && new Date(transaction.due_date).getDate() === date
                    )[0].transaction.id === item.transaction.id;

                  return (
                    <EventTransactionButton
                      firstOfDay={firstOfDay}
                      firstOfYear={firstOfYear}
                      key={item.transaction.id}
                      index={index}
                      eventTransaction={item}
                    />
              )}}
            />
          )}
      </Container>
      <Button onPress={handleCancelAgreementConfirmationWindow}>Deletar Contrato</Button>
    </WindowContainer>
  );
}
