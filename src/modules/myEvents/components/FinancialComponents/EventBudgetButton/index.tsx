import React, { useMemo, useState } from 'react';
import CurrencyInlineFormField from '../../../../../components/CurrencyInlineFormField';
import theme from '../../../../../global/styles/theme';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import {
  Container,
  BudgetButton,
  Title,
  Value,
  PercentageUnderline,
} from './styles';

export function EventBudgetButton() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;

  const {
    createEventBudget,
    updateEventBudget,
  } = useMyEvent();
  const { eventBudget, isOwner } = useEventVariables();

  const [editBudget, setEditBudget] = useState(false);

  function handleEditBudget() {
    isOwner && setEditBudget(!editBudget);
  }

  const budget = useMemo(() => {
    return eventBudget && eventBudget.budget ? eventBudget.budget : 0;
  }, [eventBudget]);


  async function handleSubmit(budget: string) {
    if (eventBudget && !eventBudget.id) {
      await createEventBudget(Number(budget));
    } else {
      await updateEventBudget({
        ...eventBudget,
        budget: Number(budget),
      });
    }
    handleEditBudget();
  }

  return (
    <>
      {!editBudget ? (
        <BudgetButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={handleEditBudget}
        >
          <Title>Orçamento</Title>
          <PercentageUnderline />
          <Value>
            {formatBrlCurrency(budget)}
          </Value>
        </BudgetButton>
      ) : (
        <Container>
          <Title>Orçamento</Title>

          <CurrencyInlineFormField
            defaultValue={String(budget)}
            handleOnSubmit={handleSubmit}
            closeComponent={handleEditBudget}
          />
        </Container>
      )}
    </>
  );
}
