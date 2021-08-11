import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import WindowContainer from '../../../../../components/WindowContainer';
import Button from '../../../../../components/Button';
import { SectionHeader } from '../../../../../components/SectionHeader';

import {
  Container,
  BudgetContainer,
} from './styles';
import { useTransaction } from '../../../../../hooks/transactions';
import { addMonths } from 'date-fns';

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
              return (
                <Button
                  key={item.id}
                >
                  {String(item.amount)}
                </Button>
              );
            }}
          />
        )}
      </Container>
    </WindowContainer>
  );
}
