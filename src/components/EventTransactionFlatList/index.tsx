import React from 'react';
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
  return (
    <Container
      data={transactions}
      keyExtractor={(item) => item.transaction.id}
      renderItem={({ item }) => {
        const transactionYear = new Date(item.transaction.due_date).getFullYear();
        const firstOfYear = year && transactions
          .filter(({ transaction }) =>
            new Date(transaction.due_date).getFullYear() === transactionYear
          )[0].transaction.id === item.transaction.id;
        const transactionMonth = new Date(item.transaction.due_date).getMonth();
        const date = new Date(item.transaction.due_date).getDate();


        const firstOfMonth = month && transactions
          .filter(({ transaction }) =>
            new Date(transaction.due_date).getFullYear() === transactionYear
            && new Date(transaction.due_date).getMonth() === transactionMonth
          )[0].transaction.id === item.transaction.id;

        const firstOfDay = transactions
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
