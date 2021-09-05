import React, { useState } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import WindowContainer from '../../../../../components/WindowContainer';
import { SectionHeader } from '../../../../../components/SectionHeader';

import {
  Container,
  BudgetContainer,
} from './styles';
import { useTransaction } from '../../../../../hooks/transactions';
import { addMonths } from 'date-fns';
import { EventSupplierBudgetButton } from '../EventSupplierBudgetButton';

export function EventSupplierBudgetsWindow() {
  const {
    selectedSupplier,
  } = useMyEvent();
  const {
    handleSupplierBudgetsWindow,
    handleSupplierBudgetForm,
  } = useEventSuppliers();
  const { handleSelectedDate } = useTransaction();

  const [budgetDescriptionWindow, setBudgetDescriptionWindow] = useState(false);

  function handleBudgetDescriptionWindow() {
    setBudgetDescriptionWindow(!budgetDescriptionWindow);
  }

  function openSupplierBudgetsForm() {
    handleSelectedDate(addMonths(new Date(), 3));
    handleSupplierBudgetForm();
  }

  return (
    <WindowContainer
      closeWindow={handleSupplierBudgetsWindow}
      zIndex={16}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
      backdropZIndex={15}
    >
      <Container>
        <SectionHeader
          handleAddButton={openSupplierBudgetsForm}
          handleInfoButton={handleBudgetDescriptionWindow}
          title="Orçamentos"
        />
        {selectedSupplier.budgets.length > 0 && (
          <BudgetContainer
            data={selectedSupplier.budgets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const index = String(selectedSupplier.budgets
                .findIndex(budget => budget.id === item.id) + 1);
              return (
                <EventSupplierBudgetButton
                  budget={item}
                  key={item.id}
                  index={index}
                />
              );
            }}
          />
        )}
      </Container>
    </WindowContainer>
  );
}
