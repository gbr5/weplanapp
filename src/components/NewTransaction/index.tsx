import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionDTO';
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

  return (
    <>
      <Container>
        <TextContainer>
          <Index>{index} )</Index>
          <Amount
            isOverdue={isOverdue}
            isPaid={transaction.isPaid}
          >
            {formatBrlCurrency(transaction.amount)}
          </Amount>
          <DateText>{formatOnlyDateShort(String(transaction.due_date))}</DateText>
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
