import React from 'react';

import { useTransaction } from '../../../hooks/transactions';

import ICreateTransactionDTO from '../../../dtos/ICreateTransactionDTO';

import { DatePickerWindow } from '../../DatePickerWindow';

export function EditNewTransactionDueDate() {
  const {
    handleEditNewTransactionDueDateWindow,
    newTransactions,
    selectNewTransactions,
    selectedNewTransaction,
    handleSelectedNewTransaction,
  } = useTransaction();

  function handleSubmit(date: Date) {
    const transactions = newTransactions.map(item => {
      if (item === selectedNewTransaction) {
        return {
          ...item,
          due_date: new Date(date),
        };
      }
      return item;
    }).sort((a, b) => {
      if (new Date(a.due_date) > new Date(b.due_date)) return 1;
      if (new Date(a.due_date) < new Date(b.due_date)) return -1;
      return 0;
    });
    selectNewTransactions(transactions);
    handleSelectedNewTransaction({} as ICreateTransactionDTO);
    handleEditNewTransactionDueDateWindow();
  }

  return (
    <DatePickerWindow
      zIndex={31}
      closeWindow={handleEditNewTransactionDueDateWindow}
      selectDate={(date: Date) => handleSubmit(date)}
      selectedDate={selectedNewTransaction.due_date}
    />
  );
}
