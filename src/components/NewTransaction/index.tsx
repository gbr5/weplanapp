import React from 'react';
import { useMemo } from 'react';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionDTO';
import { formatBrlCurrency } from '../../utils/formatBrlCurrency';
import formatOnlyDate from '../../utils/formatOnlyDate';

import {
  Container,
  ButtonContainer,
  TextContainer,
  Amount,
  DateText,
  DeleteButton,
  DeleteIcon,
  EditButton,
  EditIcon,
  IsPaidButton,
  IsPaidIcon,
} from './styles';

interface IProps {
  transaction: ICreateTransactionDTO;
}

export function NewTransaction({
  transaction,
}: IProps) {
  const isOverdue = useMemo(() => {
    if (transaction.isPaid) return false;
    const today = new Date();
    const dueDate = new Date(transaction.due_date);
    if (today > dueDate) return true;
    return false;
  }, [transaction]);
  return (
    <Container>
      <TextContainer>
        <Amount
          isOverdue={isOverdue}
          isPaid={transaction.isPaid}
        >
          {formatBrlCurrency(transaction.amount)}
        </Amount>
        <DateText>{formatOnlyDate(String(transaction.due_date))}</DateText>
      </TextContainer>
    </Container>
  );
}
