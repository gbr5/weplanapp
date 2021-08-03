import React from 'react';
import { useMemo } from 'react';
import IEventTransactionDTO from '../../../dtos/IEventTransactionDTO';
import { useTransaction } from '../../../hooks/transactions';
import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';
import { EventTransactionButtonInfo } from '../EventTransactionButtonInfo';

import {
  Container,
  TextContainer,
  Sign,
  Amount,
  InfoButton,
  InfoIcon,
  Underline,
  CancelledTransaction,
  MonthContainer,
  Month,
  DayContainer,
  Day,
} from './styles';

interface IProps {
  firstOfDay?: boolean;
  firstOfMonth?: boolean;
  eventTransaction: IEventTransactionDTO;
  index: string;
}

export function EventTransactionButton({
  eventTransaction,
  index,
  firstOfMonth,
  firstOfDay,
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
  }, [eventTransaction]);

  const month = useMemo(() => {
    if (firstOfMonth) {
      const month = new Date(eventTransaction.transaction.due_date).toLocaleString('pt-BR', { month: 'long'})
      const thisMonth = month[0].toUpperCase() + month.slice(1);
      return `${thisMonth}`;
    }
  }, [eventTransaction]);

  const day = useMemo(() => formatOnlyDateShort(String(eventTransaction.transaction.due_date)), [eventTransaction]);

  return (
    <>
      {firstOfMonth  && (
        <>
          <Underline />
          <MonthContainer>
            <Month>{month}</Month>
          </MonthContainer>
        </>
      )}
      {firstOfDay && (
        <>
          <Underline />
          <DayContainer>
            <Day>{day}</Day>
          </DayContainer>
        </>
      )}
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
        {eventTransaction.transaction.payer_id === eventTransaction.event_id ? (
          <TextContainer>
            <Amount
              isOverdue={isOverdue}
              isPaid={eventTransaction.transaction.isPaid}
            >
              {formatBrlCurrency(eventTransaction.transaction.amount)}
            </Amount>
          </TextContainer>
        ) : (
          <TextContainer>
            <Amount
              style={{
                textAlign: 'left',
              }}
              isOverdue={isOverdue}
              isPaid={eventTransaction.transaction.isPaid}
            >
              <Sign> - </Sign>
              {formatBrlCurrency(eventTransaction.transaction.amount)}
            </Amount>
          </TextContainer>
        )}
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
            <EventTransactionButtonInfo />
        )}
    </>
  );
}
