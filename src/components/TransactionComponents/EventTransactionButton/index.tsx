import React from 'react';
import { useMemo } from 'react';
import IEventTransactionDTO from '../../../dtos/IEventTransactionDTO';
import ITransactionDTO from '../../../dtos/ITransactionDTO';
import { useTransaction } from '../../../hooks/transactions';
import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';
import { EventTransactionButtonInfo } from '../EventTransactionButtonInfo';

import {
  Container,
  TextContainer,
  Index,
  Amount,
  DateText,
  InfoButton,
  InfoIcon,
  Underline,
  CancelledTransaction,
} from './styles';

interface IProps {
  eventTransaction: IEventTransactionDTO;
  index: string;
}

export function EventTransactionButton({
  eventTransaction,
  index,
}: IProps) {
  const {
    selectedEventTransaction,
    handleSelectedEventTransaction,
  } = useTransaction();

  function handleSelectTransaction() {
    eventTransaction.transaction.isCancelled && handleSelectedEventTransaction({} as IEventTransactionDTO);
    !selectedEventTransaction
      || !selectedEventTransaction.transaction
      || selectedEventTransaction.transaction.id !== eventTransaction.transaction.id
      ? handleSelectedEventTransaction(eventTransaction)
      : handleSelectedEventTransaction({} as IEventTransactionDTO);
  }

  const isOverdue = useMemo(() => {
    if (eventTransaction.transaction.isPaid) return false;
    const today = new Date();
    const dueDate = new Date(eventTransaction.transaction.due_date);
    if (today > dueDate) return true;
    return false;
  }, [eventTransaction.transaction]);

  return (
    <>
      <Container
        isSelected={
          selectedEventTransaction &&
          selectedEventTransaction.transaction &&
            eventTransaction.transaction.id === selectedEventTransaction.transaction.id
        }
        isCancelled={eventTransaction.transaction.isCancelled}
        onPress={handleSelectTransaction}
      >
        {eventTransaction.transaction.isCancelled && <CancelledTransaction />}
        <TextContainer>
          <Index>{index} )</Index>
          <Amount
            isOverdue={isOverdue}
            isPaid={eventTransaction.transaction.isPaid}
          >
            {formatBrlCurrency(eventTransaction.transaction.amount)}
          </Amount>
          <DateText>{formatOnlyDateShort(String(eventTransaction.transaction.due_date))}</DateText>
        </TextContainer>
        {!eventTransaction.transaction.isCancelled && (
          <InfoButton onPress={handleSelectTransaction}>
            {selectedEventTransaction
              && selectedEventTransaction.transaction
              && selectedEventTransaction.transaction.id === eventTransaction.transaction.id ? (
                <InfoIcon name="chevron-up" />
              ) : (
                <InfoIcon name="chevron-down" />
              )}
          </InfoButton>
        )}
      </Container>
      {selectedEventTransaction
        && selectedEventTransaction.transaction
        && selectedEventTransaction.transaction.id === eventTransaction.transaction.id
        && !eventTransaction.transaction.isCancelled && (
          <>
            <Underline />
            <EventTransactionButtonInfo />
            <Underline />
          </>
        )}
      <Underline />
    </>
  );
}
