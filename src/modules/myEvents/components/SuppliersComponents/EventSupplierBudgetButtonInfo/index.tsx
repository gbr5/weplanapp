import React, { useState } from 'react';
import { CheckBoxButton } from '../../../../../components/CheckBoxButton';
import IEventSupplierBudgetDTO from '../../../../../dtos/IEventSupplierBudgetDTO';
import theme from '../../../../../global/styles/theme';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import {
  Container,
  Button,
  Amount,
  DueDate,
  Row,
  Label,
} from './styles';

interface IProps {
  budget: IEventSupplierBudgetDTO;
}

export function EventSupplierBudgetButtonInfo({
  budget,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    updateSupplierBudget,
    handleSupplierSelectedDate,
    handleSupplierSelectedDateWindow,
    selectSupplierBudget,
    handleEditSupplierBudgetDescriptionWindow,
    handleEditSupplierBudgetAmountWindow,
  } = useEventSuppliers();
  const [loading, setLoading] = useState(false);

  async function handleUpdateSupplierBudgetIsActive() {
    try {
      setLoading(true);
      await updateSupplierBudget({
        ...budget,
        isActive: !budget.isActive,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  function openDueDateWindow() {
    handleSupplierSelectedDate(new Date(budget.due_date));
    handleSupplierSelectedDateWindow();
  }

  function openAmountWindow() {
    handleEditSupplierBudgetAmountWindow();
  }

  function openDescriptionWindow() {
    handleEditSupplierBudgetDescriptionWindow();
  }

  return (
    <>
      <Container
        style={{
          shadowColor: theme.iconButtonShadow.shadowColor,
          shadowOffset: theme.iconButtonShadow.shadowOffset,
          shadowOpacity: theme.iconButtonShadow.shadowOpacity,
          shadowRadius: theme.iconButtonShadow.shadowRadius,
        }}
      >
        <Button
          onPress={openAmountWindow}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          <Label>Valor: </Label>
          <Amount>{formatBrlCurrency(budget.amount)}</Amount>
        </Button>
        <Button
          onPress={openDescriptionWindow}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          <Label>Descrição: </Label>
          <Amount>{budget.description !== '' ? budget.description : '-'}</Amount>
        </Button>
        <Button
          onPress={openDueDateWindow}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          <Label>Vencimento: </Label>
          <Amount>{formatOnlyDateShort(String(budget.due_date))}</Amount>
        </Button>

      </Container>
    </>
  );
}
