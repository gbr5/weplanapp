import React, { useMemo, useState } from 'react';
import { EventNumberOfGuestsButton } from '../../../../components/EventNumberOfGuestsButton';
import { EventRestrictedNumberOfGuestQuestion } from '../../../../components/EventRestrictedNumberOfGuestQuestion';
import { WindowHeader } from '../../../../components/WindowHeader';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';

import {
  Container,
  Body,
  SubContainer,
  Title,
} from './styles';

export function EventDashboardSection() {
  const {
    eventOwners,
    eventMembers,
    eventGuests,
    selectedEvent,
    totalEventRevenue,
    totalEventCost,
  } = useEventVariables();

  const numberOfEventParticipants = useMemo(() => {
    return eventOwners.length + eventMembers.length + eventGuests.length;
  }, [
    eventOwners,
    eventMembers,
    eventGuests,
  ]);

  const result = useMemo(() => {
    return formatBrlCurrency(totalEventRevenue - totalEventCost);
  }, [totalEventRevenue,totalEventCost])

  return (
    <Container>
      <WindowHeader title="Home" />
      <Body>
        <EventRestrictedNumberOfGuestQuestion />

        {selectedEvent.isNumberOfGuestsRestricted && (
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
        <SubContainer>
          <Title>Próximas Transações</Title>
        </SubContainer>
        <SubContainer>
          <Title>Transações atrasadas</Title>
        </SubContainer>
      </Body>
    </Container>
  );
}
