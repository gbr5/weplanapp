import React from 'react';
import { useMemo } from 'react';
import ITransactionDTO from '../../../dtos/ITransactionDTO';
import { useTransaction } from '../../../hooks/transactions';
import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';
import { TransactionButtonInfo } from '..//TransactionButtonInfo';

import {
  Container,
  TextContainer,
  Index,
  Amount,
  DateText,
  InfoButton,
  InfoIcon,
  Underline,
} from './styles';

interface IProps {
  transaction: ITransactionDTO;
  index: string;
}

export function TransactionButton({
  transaction,
  index,
}: IProps) {
  const {
    selectedTransaction,
    selectTransaction,
  } = useTransaction();

  function handleSelectTransaction() {
    !selectedTransaction
      || !selectedTransaction.id
      || selectedTransaction.id !== transaction.id
      ? selectTransaction(transaction)
      : selectTransaction({} as ITransactionDTO);
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
      <Container onPress={handleSelectTransaction}>
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
        <InfoButton onPress={handleSelectTransaction}>
          {selectedTransaction
            && selectedTransaction.id
            && selectedTransaction.id === transaction.id ? (
              <InfoIcon name="chevron-up" />
            ) : (
              <InfoIcon name="chevron-down" />
            )}
        </InfoButton>
      </Container>
      {selectedTransaction
        && selectedTransaction.id
        && selectedTransaction.id === transaction.id && (
          <>
            <Underline />
            <TransactionButtonInfo />
            <Underline />
          </>
        )}
      <Underline />
    </>
  );
}
