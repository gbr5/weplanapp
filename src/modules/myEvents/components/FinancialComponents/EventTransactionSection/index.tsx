import React, { useMemo, useState } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import IEventTransactionDTO from '../../../../../dtos/IEventTransactionDTO';

import { EventTransactionButton } from '../../../../../components/TransactionComponents/EventTransactionButton';
import { AddButton } from '../../../../../components/AddButton';

import {
  Container,
  FilterButton,
  FilterIcon,
  TransactionContainer,
  Title,
} from './styles';

export function EventTransactionSection() {
  const { eventSuppliers } = useMyEvent();
  const {
    eventTransactions,
    cancelledTransactionFilter,
    sortTransactionsByInterval,
    fromDateTransactionFilter,
    toDateTransactionFilter,
    handleFilterTransactionWindow,
    filterTransactionOption,
  } = useTransaction();

  const transactions = useMemo<IEventTransactionDTO[]>(() => {
    if (sortTransactionsByInterval) {
      const updatedTransactions = eventTransactions
        .filter(({ transaction }) =>
          new Date(transaction.due_date) > fromDateTransactionFilter
            && new Date(transaction.due_date) < toDateTransactionFilter);
      if (filterTransactionOption === 'paid') {
        if (!cancelledTransactionFilter) return updatedTransactions
          .filter(({ transaction }) =>
            !transaction.isCancelled && transaction.isPaid);
        return updatedTransactions.filter(({ transaction }) =>
          transaction.isPaid);
      }
      if (filterTransactionOption === 'notPaid') {
        if (!cancelledTransactionFilter) return updatedTransactions.filter(({ transaction }) =>
          !transaction.isCancelled && !transaction.isPaid);
        return updatedTransactions.filter(({ transaction }) =>
          !transaction.isPaid);
      }
      if (filterTransactionOption === 'delayed') {
        if (!cancelledTransactionFilter) return updatedTransactions.filter(({ transaction }) =>
          !transaction.isCancelled && !transaction.isPaid
            && new Date() > new Date(transaction.due_date));
        return updatedTransactions.filter(({ transaction }) =>
          !transaction.isPaid && new Date() < new Date(transaction.due_date));
      }
      if (!cancelledTransactionFilter) return updatedTransactions.filter(({ transaction }) =>
        !transaction.isCancelled);
      return updatedTransactions;
    }
    if (filterTransactionOption === 'paid') {
      if (!cancelledTransactionFilter) return eventTransactions.filter(({ transaction }) =>
        !transaction.isCancelled && transaction.isPaid);
      return eventTransactions.filter(({ transaction }) =>
        transaction.isPaid);
    }
    if (filterTransactionOption === 'notPaid') {
      if (!cancelledTransactionFilter) return eventTransactions.filter(({ transaction }) =>
        !transaction.isCancelled && !transaction.isPaid);
      return eventTransactions.filter(({ transaction }) =>
        !transaction.isPaid);
    }
    if (filterTransactionOption === 'delayed') {
      if (!cancelledTransactionFilter) return eventTransactions.filter(({ transaction }) =>
        !transaction.isCancelled && !transaction.isPaid
          && new Date() > new Date(transaction.due_date));
      return eventTransactions.filter(({ transaction }) =>
        !transaction.isPaid && new Date() < new Date(transaction.due_date));
    }
    if (!cancelledTransactionFilter) return eventTransactions.filter(({ transaction }) =>
      !transaction.isCancelled);
    return eventTransactions;
  }, [eventSuppliers,
    eventTransactions,
    filterTransactionOption,
    cancelledTransactionFilter,
    fromDateTransactionFilter,
    toDateTransactionFilter,
    sortTransactionsByInterval,
  ]);

  return (
    <Container>
      <FilterButton onPress={handleFilterTransactionWindow}>
        <FilterIcon name="filter" />
      </FilterButton>
      <AddButton onPress={() => {}} right="2%" top="-6%" />
      <Title>Transações</Title>
      {transactions
        && transactions.length > 0 && (
          <TransactionContainer
            data={transactions}
            keyExtractor={(item) => item.transaction.id}
            renderItem={({ item }) => {
              const index = String(transactions.findIndex(transaction => transaction.transaction.id === item.transaction.id) + 1);
              const month = new Date(item.transaction.due_date).getMonth();
              const date = new Date(item.transaction.due_date).getDate();
              const firstOfMonth = transactions
                .filter(({ transaction }) =>
                  new Date(transaction.due_date).getMonth() === month
                )[0].transaction.id === item.transaction.id;
              const firstOfDay = transactions
                .filter(({ transaction }) =>
                  new Date(transaction.due_date).getMonth() === month
                  && new Date(transaction.due_date).getDate() === date
                )[0].transaction.id === item.transaction.id;
              return (
                <EventTransactionButton
                  firstOfDay={firstOfDay}
                  firstOfMonth={firstOfMonth}
                  key={item.transaction.id}
                  index={index}
                  eventTransaction={item}
                />
              );
            }}
          />
        )}
    </Container>
  );
}
