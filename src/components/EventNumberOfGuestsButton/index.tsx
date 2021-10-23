import React, { useMemo, useState } from 'react';
import CurrencyInlineFormField from '../../components/CurrencyInlineFormField';
import theme from '../../global/styles/theme';
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

export function EventNumberOfGuestsButton() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;

  const {
    editEvent,
  } = useMyEvent();
  const { selectedEvent } = useEventVariables();

  const [editNumberOfGuests, setEditNumberOfGuests] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleEditNumberOfGuests() {
    setEditNumberOfGuests(!editNumberOfGuests);
  }

  async function handleSubmit(number_of_guests: string) {
    try {
      setLoading(true);
      await editEvent({
        ...selectedEvent,
        number_of_guests: Number(number_of_guests),
      });
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
          <Title>Limite máximo de convidados</Title>
          <PercentageUnderline />
          <Value>
            {selectedEvent.number_of_guests}
          </Value>
        </BudgetButton>
      ) : (
        <Container>
          <Title>Definir limite de convidados do evento</Title>

          <InlineFormField
            keyboardType={"numeric"}
            placeholder={String(selectedEvent.number_of_guests)}
            defaultValue={String(selectedEvent.number_of_guests)}
            handleOnSubmit={handleSubmit}
            closeComponent={handleEditNumberOfGuests}
          />
        </Container>
      )}
    </>
  );
}
