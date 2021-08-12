import React, { useState } from 'react';
import { CheckBoxButton } from '../../../../../components/CheckBoxButton';
import IEventSupplierBudgetDTO from '../../../../../dtos/IEventSupplierBudgetDTO';
import theme from '../../../../../global/styles/theme';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';
import { EventSupplierBudgetButtonInfo } from '../EventSupplierBudgetButtonInfo';

import {
  OverContainer,
  Container,
  Index,
  Amount,
  DueDate,
  Row,
} from './styles';

interface IProps {
  index: string;
  budget: IEventSupplierBudgetDTO;
}

export function EventSupplierBudgetButton({
  budget,
  index,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    updateSupplierBudget,
    selectSupplierBudget,
    selectedSupplierBudget,
  } = useEventSuppliers();
  const [loading, setLoading] = useState(false);

  function handleBudgetInfo() {
    if (selectedSupplierBudget.id === budget.id)
      return selectSupplierBudget({} as IEventSupplierBudgetDTO);
    selectSupplierBudget(budget);
  }

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

  return (
    <OverContainer>
      <Container
        onPress={handleBudgetInfo}
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
      >
        <Row>
          <Index>{index} )</Index>
          <Amount>{formatBrlCurrency(budget.amount)}</Amount>
          <CheckBoxButton
            isActive={budget.isActive}
            handleIsActive={handleUpdateSupplierBudgetIsActive}
            loading={loading}
          />
        </Row>
        <Row>
          <DueDate>Vencimento: </DueDate>
          <DueDate>{formatOnlyDateShort(String(budget.due_date))}</DueDate>
        </Row>

      </Container>
      {selectedSupplierBudget.id === budget.id && (
        <EventSupplierBudgetButtonInfo budget={budget} />
      )}
    </OverContainer>
  );
}
