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
import theme from '../../../../../global/styles/theme';
import { SearchTransactions } from '../../../../../components/TransactionComponents/SearchTransactions';

export function EventTransactionSection() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.iconButtonShadow;
  const { eventSuppliers, eventTransactions } = useMyEvent();
  const {
    cancelledTransactionFilter,
    sortTransactionsByInterval,
    fromDateTransactionFilter,
    toDateTransactionFilter,
    handleFilterTransactionWindow,
    filterTransactionOption,
    handleCreateTransactionWindow,
    handleSelectedDate,
    filteredEventTransactions,
    handleFilteredEventTransactions,
  } = useTransaction();

  const transactions = useMemo<IEventTransactionDTO[]>(() => {
    if (filteredEventTransactions.length < 0) return [];
    if (sortTransactionsByInterval) {
      const updatedTransactions = filteredEventTransactions
        .filter(({ transaction }) => transaction
          && new Date(transaction.due_date) > fromDateTransactionFilter
          && new Date(transaction.due_date) < toDateTransactionFilter);
      if (filterTransactionOption === 'paid') {
        if (!cancelledTransactionFilter) return updatedTransactions
          .filter(({ transaction }) => transaction
            && !transaction.isCancelled && transaction.isPaid);
        return updatedTransactions.filter(({ transaction }) => transaction
          && transaction.isPaid);
      }
      if (filterTransactionOption === 'notPaid') {
        if (!cancelledTransactionFilter)
          return updatedTransactions.filter(({ transaction }) => transaction
            && !transaction.isCancelled && !transaction.isPaid);
        return updatedTransactions.filter(({ transaction }) => transaction
          && !transaction.isPaid);
      }
      if (filterTransactionOption === 'delayed') {
        if (!cancelledTransactionFilter)
          return updatedTransactions.filter(({ transaction }) => transaction
            && !transaction.isCancelled && !transaction.isPaid
            && new Date() > new Date(transaction.due_date));
        return updatedTransactions.filter(({ transaction }) => transaction
          && !transaction.isPaid && new Date() < new Date(transaction.due_date));
      }
      if (!cancelledTransactionFilter)
        return updatedTransactions.filter(({ transaction }) => transaction
          && !transaction.isCancelled);
      return updatedTransactions;
    }
    if (filterTransactionOption === 'paid') {
      if (!cancelledTransactionFilter)
        return filteredEventTransactions.filter(({ transaction }) => transaction
          && !transaction.isCancelled && transaction.isPaid);
      return filteredEventTransactions.filter(({ transaction }) => transaction
        && transaction.isPaid);
    }
    if (filterTransactionOption === 'notPaid') {
      if (!cancelledTransactionFilter)
        return filteredEventTransactions.filter(({ transaction }) => transaction
          && !transaction.isCancelled && !transaction.isPaid);
      return filteredEventTransactions.filter(({ transaction }) => transaction
        && !transaction.isPaid);
    }
    if (filterTransactionOption === 'delayed') {
      if (!cancelledTransactionFilter)
        return filteredEventTransactions.filter(({ transaction }) => transaction
          && !transaction.isCancelled
          && !transaction.isPaid
          && new Date() > new Date(transaction.due_date));
      return filteredEventTransactions.filter(({ transaction }) =>
        !transaction.isPaid && new Date() < new Date(transaction.due_date));
    }
    if (!cancelledTransactionFilter)
      return filteredEventTransactions.filter(
        ({ transaction }) => transaction && !transaction.isCancelled);
    return filteredEventTransactions;
  }, [
    eventSuppliers,
    filteredEventTransactions,
    filterTransactionOption,
    cancelledTransactionFilter,
    fromDateTransactionFilter,
    toDateTransactionFilter,
    sortTransactionsByInterval,
  ]);

  const filter = useMemo(() => {
    if (
      !cancelledTransactionFilter
      && !sortTransactionsByInterval
      && filterTransactionOption === 'all'
    ) return false;
    return true;
  }, [
    cancelledTransactionFilter,
    sortTransactionsByInterval,
    filterTransactionOption,
  ]);

  function handleOpenCreateTransactionWindow() {
    handleSelectedDate(new Date());
    handleCreateTransactionWindow();
  }

  return (
    <Container>
      <FilterButton
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
        onPress={handleFilterTransactionWindow}
      >
        <FilterIcon
          color={filter ? theme.color.atention : theme.color.info}
          name="filter"
        />
      </FilterButton>
      <AddButton onPress={handleOpenCreateTransactionWindow} right="2%" top="-6%" />
      <Title>Transações</Title>

      <SearchTransactions
        eventTransactions={eventTransactions}
        handleEventTransactions={(data: IEventTransactionDTO[]) => handleFilteredEventTransactions(data)}
      />

      {transactions
        && transactions.length > 0 && (
          <TransactionContainer
            data={transactions}
            keyExtractor={(item) => item.transaction.id}
            renderItem={({ item }) => {
              const year = new Date(item.transaction.due_date).getFullYear();
              const month = new Date(item.transaction.due_date).getMonth();
              const date = new Date(item.transaction.due_date).getDate();

              const firstOfYear = transactions
                .filter(({ transaction }) =>
                  new Date(transaction.due_date).getFullYear() === year
                )[0].transaction.id === item.transaction.id;

              const firstOfMonth = transactions
                .filter(({ transaction }) =>
                  new Date(transaction.due_date).getFullYear() === year
                  && new Date(transaction.due_date).getMonth() === month
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
                  firstOfMonth={firstOfMonth}
                  firstOfYear={firstOfYear}
                  key={item.transaction.id}
                  eventTransaction={item}
                />
              );
            }}
          />
        )}
    </Container>
  );
}
