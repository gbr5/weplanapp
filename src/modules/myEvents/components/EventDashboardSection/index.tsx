import React, { useMemo } from 'react';
import { addDays } from 'date-fns/esm';
import { differenceInDays } from 'date-fns';

import { useEventVariables } from '../../../../hooks/eventVariables';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';

import { EventNumberOfGuestsButton } from '../../../../components/EventNumberOfGuestsButton';
import { EventRestrictedNumberOfGuestQuestion } from '../../../../components/EventRestrictedNumberOfGuestQuestion';
import { EventTransactionButton } from '../../../../components/TransactionComponents/EventTransactionButton';
import { WindowHeader } from '../../../../components/WindowHeader';
import { EventPublishedQuestion } from '../../../../components/EventPublishedQuestion';

import {
  Container,
  Body,
  SubContainer,
  NextTransactionsContainer,
  Title,
} from './styles';

export function EventDashboardSection() {
  const {
    isOwner,
    eventOwners,
    eventMembers,
    eventGuests,
    selectedEvent,
    totalEventRevenue,
    totalEventCost,
    allEventTransactions,
  } = useEventVariables();

  const today = new Date();
  const newDate = new Date(today.setUTCHours(0));
  const formattedDate = new Date(newDate.setMinutes(0));

  const numberOfEventParticipants = useMemo(() => {
    return eventOwners.length + eventMembers.length + eventGuests.length;
  }, [
    eventOwners,
    eventMembers,
    eventGuests,
  ]);

  const result = useMemo(() => {
    return formatBrlCurrency(totalEventRevenue - totalEventCost);
  }, [totalEventRevenue,totalEventCost]);

  const threeLatestTransactions = useMemo(() => {
    if (allEventTransactions.length <= 0) return [];
    const lateTransactions = allEventTransactions
      .filter(transaction =>
        !transaction.transaction.isCancelled
          && !transaction.transaction.isPaid
          && new Date(transaction.transaction.due_date) < addDays(formattedDate, -1)
      )
      .sort((a, b) => {
        if (new Date(a.transaction.due_date) > new Date(b.transaction.due_date))
          return 1;
        if (new Date(a.transaction.due_date) < new Date(b.transaction.due_date))
          return -1;
        return 0;
      });
    if (lateTransactions.length >= 3) {
      return [
        lateTransactions[0],
        lateTransactions[1],
        lateTransactions[2],
      ];
    }
    if (lateTransactions.length >= 2) {
      return [
        lateTransactions[0],
        lateTransactions[1],
      ];
    }
    if (lateTransactions.length >= 1) {
      return [
        lateTransactions[0],
      ];
    }
    return [];
  }, [allEventTransactions, today]);

  const nextThreeTransactions = useMemo(() => {
    if (allEventTransactions.length <= 0) return [];
    const lateTransactions = allEventTransactions
      .filter(({ transaction }) =>
        !transaction.isCancelled
          && !transaction.isPaid
          && new Date(transaction.due_date) > addDays(today, 1)
      )
      .sort((a, b) => {
        if (new Date(a.transaction.due_date) > new Date(b.transaction.due_date))
          return 1;
        if (new Date(a.transaction.due_date) < new Date(b.transaction.due_date))
          return -1;
        return 0;
      });
    if (lateTransactions.length >= 3) {
      return [
        lateTransactions[0],
        lateTransactions[1],
        lateTransactions[2],
      ];
    }
    if (lateTransactions.length >= 2) {
      return [
        lateTransactions[0],
        lateTransactions[1],
      ];
    }
    if (lateTransactions.length >= 1) {
      return [
        lateTransactions[0],
      ];
    }
    return [];
  }, [allEventTransactions, today]);

  const todayTransactions = useMemo(() => {
    if (allEventTransactions.length <= 0) return [];
    const lateTransactions = allEventTransactions.filter(({ transaction }) =>
      !transaction.isCancelled
        && !transaction.isPaid
        && differenceInDays(new Date(transaction.due_date), today) < 1
        && !(differenceInDays(new Date(transaction.due_date), today) < 0)
    );
    if (lateTransactions.length >= 1) {
      return lateTransactions;
    }
    return [];
  }, [allEventTransactions, today]);

  return (
    <Container>
      <WindowHeader title="Home" />
      <Body>
        {isOwner && (
          <EventPublishedQuestion />
        )}
        {isOwner && selectedEvent.event_type === 'Prom' && <EventRestrictedNumberOfGuestQuestion />}
        {isOwner && selectedEvent.isNumberOfGuestsRestricted && (
          <EventNumberOfGuestsButton />
        )}
        <SubContainer>
          <Title>Custo total</Title>
          <Title>{formatBrlCurrency(totalEventCost)}</Title>
        </SubContainer>
        <SubContainer>
          <Title>Receita total</Title>
          <Title>{formatBrlCurrency(totalEventRevenue)}</Title>
        </SubContainer>
        <SubContainer>
          <Title>Resultado</Title>
          <Title>{result}</Title>
        </SubContainer>
        <SubContainer>
          <Title>Pessoas no evento</Title>
          <Title>{numberOfEventParticipants}</Title>
        </SubContainer>
        {todayTransactions.length > 0 && (
          <NextTransactionsContainer>
            <Title>Transações de Hoje</Title>
            {todayTransactions.map(transaction => {
              return (
                <EventTransactionButton
                  key={transaction.transaction.id}
                  eventTransaction={transaction}
                  firstOfDay={true}
                  firstOfMonth={false}
                  firstOfYear={false}
                />
              );
            })}
          </NextTransactionsContainer>
        )}
        {nextThreeTransactions.length > 0 && (
          <NextTransactionsContainer>
            <Title>Próximas Transações</Title>
            {nextThreeTransactions.map(transaction => {
              return (
                <EventTransactionButton
                  key={transaction.transaction.id}
                  eventTransaction={transaction}
                  firstOfDay={true}
                  firstOfMonth={false}
                  firstOfYear={false}
                />
              );
            })}
          </NextTransactionsContainer>
        )}
        {threeLatestTransactions.length > 0 && (
          <NextTransactionsContainer>
            <Title>Transações atrasadas</Title>
            {threeLatestTransactions.map(transaction => {
              return (
                <EventTransactionButton
                  key={transaction.transaction.id}
                  eventTransaction={transaction}
                  firstOfDay={true}
                  firstOfMonth={false}
                  firstOfYear={false}
                />
              );
            })}
          </NextTransactionsContainer>
        )}
      </Body>
    </Container>
  );
}
