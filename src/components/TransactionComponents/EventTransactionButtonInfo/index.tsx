import React, { useState, useMemo } from 'react';

import theme from '../../../global/styles/theme';

import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';
import formatOnlyDate from '../../../utils/formatOnlyDate';

import { useEventSuppliers } from '../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../hooks/myEvent';
import { useTransaction } from '../../../hooks/transactions';

import { EditTransactionAmount } from '../../../modules/myEvents/components/FinancialComponents/EditTransactionAmount';

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
} from './styles';
import ShortConfirmationWindow from '../../ShortConfirmationWindow';

export function EventTransactionButtonInfo() {
  const { getEventSuppliers } = useMyEvent();
  const { handleUpdateAgreementAndTransactions } = useEventSuppliers();
  const {
    editTransaction,
    getPayerTransactions,
    handleCancelEventTransactionConfirmationWindow,
    handleSelectedEventTransaction,
    handleSelectedDateWindow,
    handleSelectedDate,
    selectedEventTransaction,
    updateEventSupplierTransactionAgreement,
  } = useTransaction();

  const [loading, setLoading] = useState(false);
  const [editValueWindow, setEditValueWindow] = useState(false);

  const color = useMemo(() => {
    const today = new Date();
    if (selectedEventTransaction.transaction.isPaid)
      return theme.color.success_light;
    if (new Date(selectedEventTransaction.transaction.due_date) < today)
      return theme.color.atention_light;
    return theme.color.info_light;
  }, [selectedEventTransaction.transaction.isPaid, selectedEventTransaction.transaction.due_date, theme]);

  function handleEditValueWindow() {
    setEditValueWindow(!editValueWindow);
  }

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
      getPayerTransactions(selectedEventTransaction.event_id);
      selectedEventTransaction.agreement_type === 'supplier' && getEventSuppliers(selectedEventTransaction.event_id);
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

  async function updateTransactionValue(amount: number) {
    try {
      setLoading(true);
      if (selectedEventTransaction.agreement_type === 'none') {
        const response = await editTransaction({
          ...selectedEventTransaction.transaction,
          amount,
        });
        handleSelectedEventTransaction({
          ...selectedEventTransaction,
          transaction: response,
        });
      }
      if (selectedEventTransaction.agreement_type === 'supplier') {
        const updatedAgreement = handleUpdateAgreementAndTransactions({
          id: selectedEventTransaction.agreement_id,
          transactions: [
            {
              ...selectedEventTransaction.transaction,
              amount,
            },
          ]
        });
        await updateEventSupplierTransactionAgreement(updatedAgreement);
        handleSelectedEventTransaction({
          ...selectedEventTransaction,
          transaction: {
            ...selectedEventTransaction.transaction,
            amount,
          },
        });
        getEventSuppliers(selectedEventTransaction.event_id);
      }
      getPayerTransactions(selectedEventTransaction.event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    {/* Falta Recriar o Update Transaction Amount e colocar aqui!! */}
      {editValueWindow && (
        <>
          <EditTransactionAmount
            handleEditTransactionValue={(amount: number) => updateTransactionValue(amount)}
            closeWindow={handleEditValueWindow}
          />
        </>
      )}
      <Container>
        <FieldContainer>
          <FieldButton
            onPress={handleEditValueWindow}
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
            <ReceiptIcon name="file" />
          </ReceiptButton>
          <DeleteButton
            onPress={handleCancelEventTransactionConfirmationWindow}
          >
            <DeleteIcon name="trash-2" />
          </DeleteButton>
        </FieldContainer>
      </Container>
    </>
  );
}
