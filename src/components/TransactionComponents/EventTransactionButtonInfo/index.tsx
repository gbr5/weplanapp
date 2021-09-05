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
import { NotificationNumber } from '../../NotificationNumber';
import { useNote } from '../../../hooks/notes';
import { useEffect } from 'react';
import InlineFormField from '../../InlineFormField';

export function EventTransactionButtonInfo() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.menuShadow;
  const { getTransactionNotes, selectedTransactionNotes } = useNote();
  const {
    editTransaction,
    handleCancelEventTransactionConfirmationWindow,
    handleSelectedEventTransaction,
    handleSelectedDateWindow,
    handleSelectedDate,
    selectedEventTransaction,
    handleEditEventTransactionValueWindow,
    handleTransactionNotesWindow,
    handleTransactionFilesWindow,
  } = useTransaction();

  const [loading, setLoading] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  function handleEditName() {
    setEditName(!editName);
  }

  function handleEditCategory() {
    setEditCategory(!editCategory);
  }

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

  async function updateTransactionName(name: string) {
    try {
      setLoading(true);
      const response = await editTransaction({
        ...selectedEventTransaction.transaction,
        name,
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
  async function updateTransactionCategory(category: string) {
    try {
      setLoading(true);
      const response = await editTransaction({
        ...selectedEventTransaction.transaction,
        category,
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

  useEffect(() => {
    getTransactionNotes(selectedEventTransaction.transaction.id);
  }, []);

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 5,
      }}
    >
      {/* {selectedEventTransaction.transaction.category && ( */}
        <CategoryContainer>
          {editCategory ? (
            <FieldButton
              style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
                elevation: 5,
              }}
            >
              <FieldLabel>Categoria</FieldLabel>
              <InlineFormField
                defaultValue={selectedEventTransaction.transaction.category}
                placeholder={selectedEventTransaction.transaction.category}
                handleOnSubmit={updateTransactionCategory}
                closeComponent={handleEditCategory}
              />
            </FieldButton>
          ) : (
            <FieldButton
              style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
                elevation: 5,
              }}
              onPress={handleEditCategory}
            >
              <FieldLabel>Categoria</FieldLabel>
              <Label>
                {selectedEventTransaction.transaction.category
                  && selectedEventTransaction.transaction.category}
              </Label>
            </FieldButton>
          )}
        </CategoryContainer>
      {/* )} */}
        <CategoryContainer>
        {editName ? (
            <FieldButton
              style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
                elevation: 5,
              }}
            >
              <FieldLabel>Nome</FieldLabel>
              <InlineFormField
                defaultValue={selectedEventTransaction.transaction.name}
                placeholder={selectedEventTransaction.transaction.name}
                handleOnSubmit={updateTransactionName}
                closeComponent={handleEditName}
              />
            </FieldButton>
          ) : (
            <FieldButton
              style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
                elevation: 5,
              }}
              onPress={handleEditName}
            >
              <FieldLabel>Nome</FieldLabel>
              <Label>
                {selectedEventTransaction.transaction.name}
              </Label>
            </FieldButton>
          )}
        </CategoryContainer>
      <FieldContainer>
        <FieldButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
          onPress={handleEditEventTransactionValueWindow}
        >
          <FieldButtonText>
            {formatBrlCurrency(Number(selectedEventTransaction.transaction.amount))}
          </FieldButtonText>
        </FieldButton>
        <FieldButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}

          onPress={handleOpenUpdateTransactionDueDateWindow}
        >
          <FieldButtonText>
            {formatOnlyDate(String(selectedEventTransaction.transaction.due_date))}
          </FieldButtonText>
        </FieldButton>
      </FieldContainer>
      <FieldContainer>
        <PaidButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
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
        <ReceiptButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={handleTransactionNotesWindow}
        >
          <NotificationNumber
            number={selectedTransactionNotes.length}
            left="-55%"
            top="-55%"
          />
          <ReceiptIcon name="file-text" />
        </ReceiptButton>
        <ReceiptButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={handleTransactionFilesWindow}
        >
          <NotificationNumber
            number={selectedEventTransaction.transaction.files.length}
            left="-55%"
            top="-55%"
          />
          <ReceiptIcon name="file" />
        </ReceiptButton>
        <DeleteButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={handleCancelEventTransactionConfirmationWindow}
        >
          <DeleteIcon name="trash-2" />
        </DeleteButton>
      </FieldContainer>
    </Container>
  );
}
