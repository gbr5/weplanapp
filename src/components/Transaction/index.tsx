import React from 'react';
import { useMemo } from 'react';
import ITransactionDTO from '../../dtos/ITransactionDTO';
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
  transaction: ITransactionDTO;
}

export function Transaction({
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
          {transaction.amount}
        </Amount>
        <DateText>{formatOnlyDate(String(transaction.due_date))}</DateText>
      </TextContainer>
      <ButtonContainer>
        <DeleteButton>
          <DeleteIcon name="trash-2" />
        </DeleteButton>
        <EditButton>
          <EditIcon name="edit"/>
        </EditButton>
        <IsPaidButton>
          <IsPaidIcon isOverdue={isOverdue} isPaid={transaction.isPaid} name="edit"/>
        </IsPaidButton>
      </ButtonContainer>
    </Container>
  );
}
