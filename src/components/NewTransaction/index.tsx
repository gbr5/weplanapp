import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionDTO';
import theme from '../../global/styles/theme';
import { useTransaction } from '../../hooks/transactions';
import { formatBrlCurrency } from '../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../utils/formatOnlyDateShort';
import CurrencyInlineFormField from '../CurrencyInlineFormField';

import {
  Container,
  TextContainer,
  Amount,
  DateText,
  Index,
  IsPaidButton,
  IsPaidIcon,
  Underline,
  AmountButton,
  DateButton,
} from './styles';

interface IProps {
  transaction: ICreateTransactionDTO;
  index: string;
}

export function NewTransaction({
  transaction,
  index,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;

  const {
    handleEditNewTransactionDueDateWindow,
    handleSelectedNewTransaction,
    newTransactions,
    selectNewTransactions,
    selectedNewTransaction,
  } = useTransaction();

  const [isPaid, setIsPaid] = useState(false);
  const [editAmount, setEditAmount] = useState(false);

  function handleEditAmount() {
    editAmount
      ? handleSelectedNewTransaction({} as ICreateTransactionDTO)
      : handleSelectedNewTransaction(transaction);
    setEditAmount(!editAmount)
  }

  function handleIsPaid() {
    setIsPaid(!isPaid);
    newTransactions[Number(index) - 1].isPaid = !isPaid;
    selectNewTransactions(newTransactions);
  }

  const isOverdue = useMemo(() => {
    if (transaction.isPaid) return false;
    const today = new Date();
    const dueDate = new Date(transaction.due_date);
    if (today > dueDate) return true;
    return false;
  }, [transaction]);

  function handleEditDate() {
    handleSelectedNewTransaction(transaction);
    handleEditNewTransactionDueDateWindow();
  }

  function handleUpdateAmount(e: string) {
    const newTransaction: ICreateTransactionDTO = {
      ...transaction,
      amount: Number(e.replace(/\D/g, ''))/100,
    }
    const transactionsUpdated = newTransactions
      .filter(item => item !== transaction);
    const updatedTransactions = [
      ...transactionsUpdated,
      newTransaction,
    ].sort((a, b) => {
      if (a.due_date > b.due_date) return 1;
      if (a.due_date < b.due_date) return -1;
      return 0;
    });
    selectNewTransactions(updatedTransactions);
  }

  return (
    <>
      <Container>
        <Index>{index}</Index>
        {editAmount && selectedNewTransaction === transaction ? (
          <CurrencyInlineFormField
            defaultValue={String(transaction.amount)}
            handleOnSubmit={handleUpdateAmount}
            closeComponent={handleEditAmount}
          />
        ) : (
          <>
            <TextContainer>
              <AmountButton
                onPress={handleEditAmount}
                style={{
                  elevation: 5,
                  shadowColor,
                  shadowOffset,
                  shadowOpacity,
                  shadowRadius,
                }}
              >
                <Amount
                  isOverdue={isOverdue}
                  isPaid={transaction.isPaid}
                >
                  {formatBrlCurrency(transaction.amount)}
                </Amount>
              </AmountButton>
              <DateButton
                style={{
                  elevation: 5,
                  shadowColor,
                  shadowOffset,
                  shadowOpacity,
                  shadowRadius,
                }}
                onPress={handleEditDate}
              >
                <DateText>
                  {formatOnlyDateShort(String( transaction.due_date ))}
                </DateText>
              </DateButton>
            </TextContainer>
            <IsPaidButton
              onPress={handleIsPaid}
              isOverdue={isOverdue}
              isPaid={isPaid}
            >
              {isPaid ? (
                <IsPaidIcon
                  name="check-square"
                  isOverdue={isOverdue}
                  isPaid={isPaid}
                />
              ) : (
                <IsPaidIcon
                  name="square"
                  isOverdue={isOverdue}
                  isPaid={isPaid}
                />
              )}
            </IsPaidButton>
          </>
        )}
      </Container>
      <Underline />
    </>
  );
}
