import React, { useMemo } from 'react';
import IEventTransactionDTO from '../../dtos/IEventTransactionDTO';
import { EventTransactionButton } from '../TransactionComponents/EventTransactionButton';

import { Container } from './styles';

interface IProps {
  transactions: IEventTransactionDTO[];
  year: boolean;
  month: boolean;
}

export function EventTransactionFlatList({
  transactions,
  year,
  month,
}: IProps) {
  const sortedTransactions = useMemo(() => {
    return transactions.sort((a, b) => {
      if (new Date(a.transaction.due_date) < new Date(b.transaction.due_date)) return 1;
      if (new Date(a.transaction.due_date) > new Date(b.transaction.due_date)) return -1;
      return 0;
    })
  }, [transactions]);
  return (
    <Container
      data={sortedTransactions}
      keyExtractor={(item) => item.transaction.id}
      renderItem={({ item }) => {
        const transactionYear = new Date(item.transaction.due_date).getFullYear();
        const firstOfYear = year && sortedTransactions
          .filter(({ transaction }) =>
            new Date(transaction.due_date).getFullYear() === transactionYear
          )[0].transaction.id === item.transaction.id;
        const transactionMonth = new Date(item.transaction.due_date).getMonth();
        const date = new Date(item.transaction.due_date).getDate();


        const firstOfMonth = month && sortedTransactions
          .filter(({ transaction }) =>
            new Date(transaction.due_date).getFullYear() === transactionYear
            && new Date(transaction.due_date).getMonth() === transactionMonth
          )[0].transaction.id === item.transaction.id;

        const firstOfDay = sortedTransactions
          .filter(({ transaction }) =>
            new Date(transaction.due_date).getFullYear() === transactionYear
            && new Date(transaction.due_date).getMonth() === transactionMonth
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
  );
}
