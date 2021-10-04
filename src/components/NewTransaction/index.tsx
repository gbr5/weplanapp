import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionDTO';
import theme from '../../global/styles/theme';
import { useTransaction } from '../../hooks/transactions';
import { formatBrlCurrency } from '../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../utils/formatOnlyDateShort';

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
    handleEditNewTransactionValueWindow,
    handleEditNewTransactionDueDateWindow,
    handleSelectedNewTransaction,
    newTransactions,
    selectNewTransactions,
  } = useTransaction();

  const [isPaid, setIsPaid] = useState(false);

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

  function handleEditAmount() {
    handleSelectedNewTransaction(transaction);
    handleEditNewTransactionValueWindow();
  }

  function handleEditDate() {
    handleSelectedNewTransaction(transaction);
    handleEditNewTransactionDueDateWindow();
  }

  return (
    <>
      <Container>
        <TextContainer>
          <Index>{index}</Index>
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
      </Container>
      <Underline />
    </>
  );
}
