import React from 'react';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useTransaction } from '../../../../../hooks/transactions';

import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import IEventSupplierTransactionDTO from '../../../../../dtos/IEventSupplierTransactionDTO';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { EventTransactionButton } from '../../../../../components/TransactionComponents/EventTransactionButton';

import {
  Container,
  Title,
  TransactionsContainer,
} from './styles';
import { useMemo } from 'react';
import IEventTransactionDTO from '../../../../../dtos/IEventTransactionDTO';
import { useEventVariables } from '../../../../../hooks/eventVariables';

export function SupplierTransactionsWindow() {
  const {
    selectedEventSupplier,
    selectedEvent,
    eventTransactions,
  } = useEventVariables();
  const {
    selectSupplierTransaction,
    selectSupplierTransactionAgreement,
    handleSupplierTransactionsWindow,
  } = useEventSuppliers();
  const {
    handleSelectedEventTransaction,
  } = useTransaction();

  function closeWindow() {
    handleSupplierTransactionsWindow();
    handleSelectedEventTransaction({} as IEventTransactionDTO);
    selectSupplierTransaction({} as IEventSupplierTransactionDTO);
    selectSupplierTransactionAgreement(
      {} as IEventSupplierTransactionAgreementDTO,
    );
  }

  const transactions = useMemo(() => {
    const sortedTransactions = eventTransactions.filter(
      ({ transaction }) =>
        transaction.payee_id === selectedEventSupplier.id
        || transaction.payer_id === selectedEventSupplier.id);
    return sortedTransactions;
  }, [eventTransactions, selectedEventSupplier]);

  const transactionsSum = useMemo(() => {
    const debit = transactions
      .filter(({ transaction }) => transaction.payer_id === selectedEvent.id && !transaction.isCancelled)
      .map(({ transaction }) => Number(transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);
    const credit = transactions
      .filter(({ transaction }) => transaction.payee_id === selectedEvent.id && !transaction.isCancelled)
      .map(({ transaction }) => Number(transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);
    return formatBrlCurrency(debit - credit);
  }, [transactions]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={16}
      top="5%"
      left="0%"
      height="95%"
      width="100%"
    >
      <Container>
        <WindowHeader
          overTitle={`Fornecedor: ${selectedEventSupplier.name}`}
          title="Transações"
        />

        <Title>Custo Total com o Fornecedor:  {transactionsSum}</Title>

        {transactions.length > 0 && (
          <TransactionsContainer
            data={transactions}
            keyExtractor={({ transaction }) => transaction.id}
            renderItem={({ item }) => {
              const index = String(transactions.findIndex(
                ({ transaction }) =>
                  transaction.id === item.transaction.id) + 1,
              );
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
    </WindowContainer>
  );
}
