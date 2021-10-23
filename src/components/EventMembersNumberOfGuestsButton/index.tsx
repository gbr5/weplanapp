import React, { useMemo, useState } from 'react';
import CurrencyInlineFormField from '../../components/CurrencyInlineFormField';
import theme from '../../global/styles/theme';
import { useEventMembers } from '../../hooks/eventMembers';
import { useEventVariables } from '../../hooks/eventVariables';
import { useMyEvent } from '../../hooks/myEvent';
import { formatBrlCurrency } from '../../utils/formatBrlCurrency';
import InlineFormField from '../InlineFormField';

import {
  Container,
  BudgetButton,
  Title,
  Value,
  PercentageUnderline,
} from './styles';

export function EventMembersNumberOfGuestsButton() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;

  const { selectedEvent } = useEventVariables();
  const { defineEventMembersNumberOfGuests } = useEventMembers();

  const [editNumberOfGuests, setEditNumberOfGuests] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleEditNumberOfGuests() {
    setEditNumberOfGuests(!editNumberOfGuests);
  }

  async function handleSubmit(members_number_of_guests: string) {
    try {
      setLoading(true);
      await defineEventMembersNumberOfGuests(Number(members_number_of_guests));
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
    handleEditNumberOfGuests();
  }

  return (
    <>
      {!editNumberOfGuests ? (
        <BudgetButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={handleEditNumberOfGuests}
        >
          <Title>Nº de convidados de membros</Title>
          <PercentageUnderline />
          <Value>
            {selectedEvent.members_number_of_guests}
          </Value>
        </BudgetButton>
      ) : (
        <Container>
          <Title>Defina o limite máximo de convidados que cada membro poderá convidar</Title>

          <InlineFormField
            keyboardType={"numeric"}
            placeholder={String(selectedEvent.members_number_of_guests)}
            defaultValue={String(selectedEvent.members_number_of_guests)}
            handleOnSubmit={handleSubmit}
            closeComponent={handleEditNumberOfGuests}
          />
        </Container>
      )}
    </>
  );
}
