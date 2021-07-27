import React, { useCallback, useState, useMemo } from 'react';
import { useEffect } from 'react';

import ITransactionDTO from '../../../dtos/ITransactionDTO';

import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';

import {
  Container,
  TextContainer,
  Index,
  Status,
  Amount,
  DateText,
  InfoButton,
  InfoIcon,
  Underline,
} from './styles';

interface IProps {
  transaction: ITransactionDTO;
  index: string;
  selectTransactions: (data: ITransactionDTO[]) => void;
  selectedTransactions: ITransactionDTO[];
}

export function SelectTransactionButton({
  transaction,
  selectTransactions,
  selectedTransactions,
  index,
}: IProps) {
  const isOverdue = useMemo(() => {
    if (transaction.isPaid) return false;
    const today = new Date();
    const dueDate = new Date(transaction.due_date);
    if (today > dueDate) return true;
    return false;
  }, [transaction]);

  const status = useMemo(() => {
    if (transaction.isPaid) return 'Paga';
    const today = new Date();
    const dueDate = new Date(transaction.due_date);
    if (today > dueDate) return 'Atrasada';
    return 'A Vencer';
  }, [transaction]);

  const isActive = useMemo(() => {
    return !!selectedTransactions.find(item => item.id === transaction.id);
  }, [transaction, selectedTransactions]);

  function handleSelectTransaction() {
    const arrayTransactions: ITransactionDTO[] = [];
    const isActive = selectedTransactions.find(item => item.id === transaction.id);
    if (isActive) {
      const updatedTransactions = selectedTransactions.filter(item => item.id !== transaction.id);
      updatedTransactions.map(item => {
        arrayTransactions.push(item);
        return item;
      });
      return selectTransactions(arrayTransactions);
    }
    selectedTransactions.map(item => arrayTransactions.push(item));
    arrayTransactions.push(transaction);
    return selectTransactions(arrayTransactions);
  }

  return (
    <>
      <Container onPress={handleSelectTransaction}>
        <TextContainer>
          <Index>{index}</Index>
          <Status
            isOverdue={isOverdue}
            isPaid={transaction.isPaid}
          >
            {status}
          </Status>
          <Amount
            isOverdue={isOverdue}
            isPaid={transaction.isPaid}
          >
            {formatBrlCurrency(transaction.amount)}
          </Amount>
          <DateText>{formatOnlyDateShort(String(transaction.due_date))}</DateText>
        </TextContainer>
        <InfoButton onPress={handleSelectTransaction}>
          {isActive ? (
            <InfoIcon isActive={isActive} name="check-square" />
          ) : (
            <InfoIcon isActive={isActive} name="square" />
          )}
        </InfoButton>
      </Container>
      <Underline />
    </>
  );
}
