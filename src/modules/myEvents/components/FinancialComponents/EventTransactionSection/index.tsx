import React, { useMemo, useState } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import IEventTransactionDTO from '../../../../../dtos/IEventTransactionDTO';

import { EventTransactionButton } from '../../../../../components/TransactionComponents/EventTransactionButton';
import { AddButton } from '../../../../../components/AddButton';
import { TransactionsFilterWindow } from '../TransactionsFilterWindow';

import {
  Container,
  FilterButton,
  FilterIcon,
  TransactionContainer,
  Title,
  Menu,
  MenuButton,
  MenuTitle,
} from './styles';

export function EventTransactionSection() {
  const { eventSuppliers } = useMyEvent();
  const { eventTransactions } = useTransaction();

  const [menuOption, setMenuOption] = useState('all');
  const [isCancelled, setIsCancelled] = useState(false);
  const [filterWindow, setFilterWindow] = useState(false);
  const [sortByInterval, setSortByInterval] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  function handleFromDate(date: Date) {
    setFromDate(date);
  }

  function handleToDate(date: Date) {
    setToDate(date);
  }

  const transactions = useMemo<IEventTransactionDTO[]>(() => {
    if (sortByInterval) {
      const updatedTransactions = eventTransactions
        .filter(({ transaction }) => new Date(transaction.due_date) > fromDate && new Date(transaction.due_date) < toDate);
      if (menuOption === 'paid') {
        if (!isCancelled) return updatedTransactions.filter(({ transaction }) =>
          !transaction.isCancelled && transaction.isPaid);
        return updatedTransactions.filter(({ transaction }) =>
          transaction.isPaid);
      }
      if (menuOption === 'notPaid') {
        if (!isCancelled) return updatedTransactions.filter(({ transaction }) =>
          !transaction.isCancelled && !transaction.isPaid);
        return updatedTransactions.filter(({ transaction }) =>
          !transaction.isPaid);
      }
      if (menuOption === 'delayed') {
        if (!isCancelled) return updatedTransactions.filter(({ transaction }) =>
          !transaction.isCancelled && !transaction.isPaid
            && new Date() > new Date(transaction.due_date));
        return updatedTransactions.filter(({ transaction }) =>
          !transaction.isPaid && new Date() < new Date(transaction.due_date));
      }
      if (!isCancelled) return updatedTransactions.filter(({ transaction }) =>
        !transaction.isCancelled);
      return updatedTransactions;
    }
    if (menuOption === 'paid') {
      if (!isCancelled) return eventTransactions.filter(({ transaction }) =>
        !transaction.isCancelled && transaction.isPaid);
      return eventTransactions.filter(({ transaction }) =>
        transaction.isPaid);
    }
    if (menuOption === 'notPaid') {
      if (!isCancelled) return eventTransactions.filter(({ transaction }) =>
        !transaction.isCancelled && !transaction.isPaid);
      return eventTransactions.filter(({ transaction }) =>
        !transaction.isPaid);
    }
    if (menuOption === 'delayed') {
      if (!isCancelled) return eventTransactions.filter(({ transaction }) =>
        !transaction.isCancelled && !transaction.isPaid
          && new Date() > new Date(transaction.due_date));
      return eventTransactions.filter(({ transaction }) =>
        !transaction.isPaid && new Date() < new Date(transaction.due_date));
    }
    if (!isCancelled) return eventTransactions.filter(({ transaction }) =>
      !transaction.isCancelled);
    return eventTransactions;
  }, [eventSuppliers,
    eventTransactions,
    menuOption,
    isCancelled,
    fromDate,
    toDate,
    sortByInterval,
  ]);

  function handleMenuOption(option: string) {
    setMenuOption(option);
  }

  function handleIsCancelled() {
    setIsCancelled(!isCancelled);
  }

  function handleFilterWindow() {
    setFilterWindow(!filterWindow);
  }

  function handleSortByInterval() {
    setSortByInterval(!sortByInterval);
  }

  return (
    <Container>
      {filterWindow && (
        <TransactionsFilterWindow
          sortByInterval={sortByInterval}
          cancelled={isCancelled}
          handleCancelled={handleIsCancelled}
          handleCloseWindow={handleFilterWindow}
          fromDate={fromDate}
          handleFromDate={handleFromDate}
          handleSortByInterval={handleSortByInterval}
          handleToDate={handleToDate}
          toDate={toDate}
        />
      )}
      <FilterButton onPress={handleFilterWindow}>
        <FilterIcon name="filter" />
      </FilterButton>
      <AddButton onPress={() => {}} right="2%" top="-6%" />
      <Title>Transações</Title>
      <Menu horizontal>
        <MenuButton
          onPress={() => handleMenuOption('all')}
          isActive={menuOption === 'all'}
        >
          <MenuTitle isActive={menuOption === 'all'} >Todas</MenuTitle>
        </MenuButton>
        <MenuButton
          onPress={() => handleMenuOption('paid')}
          isActive={menuOption === 'paid'}
        >
          <MenuTitle isActive={menuOption === 'paid'} >Pagas</MenuTitle>
        </MenuButton>
        <MenuButton
          onPress={() => handleMenuOption('notPaid')}
          isActive={menuOption === 'notPaid'}
        >
          <MenuTitle isActive={menuOption === 'notPaid'} >Em Aberto</MenuTitle>
        </MenuButton>
        <MenuButton
          onPress={() => handleMenuOption('delayed')}
          isActive={menuOption === 'delayed'}
        >
          <MenuTitle isActive={menuOption === 'delayed'} >Atrasadas</MenuTitle>
        </MenuButton>
      </Menu>
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
