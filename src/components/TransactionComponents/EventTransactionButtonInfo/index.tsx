import React, { useState, useMemo } from 'react';

import theme from '../../../global/styles/theme';

import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';
import formatOnlyDate from '../../../utils/formatOnlyDate';

import { useTransaction } from '../../../hooks/transactions';

import {
  Container,
  FieldContainer,
  FieldText,
  FieldButton,
  FieldButtonText,
  PaidButton,
  PaidIcon,
  ReceiptButton,
  ReceiptIcon,
  DeleteButton,
  DeleteIcon,
  CategoryContainer,
  Label,
  FieldLabel,
} from './styles';

export function EventTransactionButtonInfo() {
  const {
    editTransaction,
    handleCancelEventTransactionConfirmationWindow,
    handleSelectedEventTransaction,
    handleSelectedDateWindow,
    handleSelectedDate,
    selectedEventTransaction,
    handleEditTransactionName,
    handleEditTransactionCategory,
    handleEditEventTransactionValueWindow,
  } = useTransaction();

  const [loading, setLoading] = useState(false);

  const color = useMemo(() => {
    const today = new Date();
    if (selectedEventTransaction.transaction.isPaid)
      return theme.color.success_light;
    if (new Date(selectedEventTransaction.transaction.due_date) < today)
      return theme.color.atention_light;
    return theme.color.info_light;
  }, [selectedEventTransaction, theme]);

  async function updateTransactionIsPaid() {
    try {
      setLoading(true);
      const response = await editTransaction({
        ...selectedEventTransaction.transaction,
        isPaid: !selectedEventTransaction.transaction.isPaid,
      });
      handleSelectedEventTransaction({
        ...selectedEventTransaction,
        transaction: response,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenUpdateTransactionDueDateWindow() {
    handleSelectedDate(new Date(selectedEventTransaction.transaction.due_date));
    handleSelectedDateWindow();
  }

  return (
    <Container>
      {/* {selectedEventTransaction.transaction.category && ( */}
        <CategoryContainer>
          <FieldButton onPress={handleEditTransactionCategory}>
            <FieldLabel>Categoria</FieldLabel>
            <Label>
              {selectedEventTransaction.transaction.category}
            </Label>
          </FieldButton>
        </CategoryContainer>
      {/* )} */}
      <FieldButton onPress={handleEditTransactionName}>
        <FieldLabel>Nome</FieldLabel>
        <Label>
          {selectedEventTransaction.transaction.name}
        </Label>
      </FieldButton>
      <FieldContainer>
        <FieldButton
          onPress={handleEditEventTransactionValueWindow}
        >
          <FieldButtonText>
            {formatBrlCurrency(Number(selectedEventTransaction.transaction.amount))}
          </FieldButtonText>
        </FieldButton>
        <FieldButton
          onPress={handleOpenUpdateTransactionDueDateWindow}
        >
          <FieldButtonText>
            {formatOnlyDate(String(selectedEventTransaction.transaction.due_date))}
          </FieldButtonText>
        </FieldButton>
      </FieldContainer>
      <FieldContainer>
        <PaidButton
          color={color}
          onPress={updateTransactionIsPaid}
        >
          {loading ? (
            <PaidIcon name="loader" />
          ) : (
            selectedEventTransaction.transaction.isPaid ? (
              <>
                <FieldText>Paga</FieldText>
                <PaidIcon name="check-square" />
              </>
            ) : (
              <>
                <FieldText>Pagar</FieldText>
                <PaidIcon name="square" />
              </>
            )
          )}
          </PaidButton>
        <ReceiptButton>
          <ReceiptIcon name="file-text" />
        </ReceiptButton>
        <ReceiptButton>
          <ReceiptIcon name="file" />
        </ReceiptButton>
        <DeleteButton
          onPress={handleCancelEventTransactionConfirmationWindow}
        >
          <DeleteIcon name="trash-2" />
        </DeleteButton>
      </FieldContainer>
    </Container>
  );
}
