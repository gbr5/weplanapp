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
