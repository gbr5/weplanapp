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
import { useEventVariables } from '../../../hooks/eventVariables';
import CurrencyInlineFormField from '../../CurrencyInlineFormField';
import { Alert } from 'react-native';
import { useEventSuppliers } from '../../../hooks/eventSuppliers';
import { roundCurrency } from '../../../utils/roundCurrency';
import { useAuth } from '../../../hooks/auth';

export function EventTransactionButtonInfo() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.menuShadow;
  const { user } = useAuth();
  const { getTransactionNotes, selectedTransactionNotes } = useNote();
  const {
    editTransaction,
    handleCancelEventTransactionConfirmationWindow,
    handleSelectedEventTransaction,
    selectedEventTransaction,
    handleTransactionNotesWindow,
    handleTransactionFilesWindow,
    updateEventSupplierTransactionAgreement,
  } = useTransaction();
  const {
    handleSelectedDate,
    handleSelectedDateWindow,
    isOwner,
    eventMembers,
  } = useEventVariables();
  const {
    handleUpdateAgreementAndTransactions,
  } = useEventSuppliers();

  const [loading, setLoading] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editAmount, setEditAmount] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  const meAsMember = useMemo(() => {
    if (!isOwner) {
      const member = eventMembers.find(item => item.userEventMember.id === user.id);
      if (member) {
        return member.id;
      }
    }
    return '';
  }, [isOwner, eventMembers, user]);

  const isAllowed = useMemo(() => {
    if (
      isOwner ||
      user.id === selectedEventTransaction.transaction.payee_id ||
      user.id === selectedEventTransaction.transaction.payer_id ||
      meAsMember === selectedEventTransaction.transaction.payee_id ||
      meAsMember === selectedEventTransaction.transaction.payer_id
    ) return true;
    return false;
  }, [isOwner, meAsMember, selectedEventTransaction, user]);

  function handleEditName() {
    isOwner && setEditName(!editName);
  }

  function handleEditAmount() {
    isOwner && setEditAmount(!editAmount);
  }

  function handleEditCategory() {
    isOwner && setEditCategory(!editCategory);
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
    if (!isAllowed) return;
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
    } catch (err: any | unknown) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelTransactionWindow() {
    if (!isOwner) return;
    handleCancelEventTransactionConfirmationWindow()
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
    } catch (err: any | unknown) {
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
    } catch (err: any | unknown) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTransactionAmount(newAmount: string) {
    try {
      setLoading(true);
      const data = roundCurrency(newAmount);
      if (!Number(data)) {
        return Alert.alert('Valor da Transação', 'Apenas números são aceitos!');
      }
      if (Number(data) <= 0) {
        return Alert.alert('Valor da Transação', 'Apenas valores maiores do que zero são aceitos!');
      }
      const amount = Number(data);
      const oldEventTransaction = selectedEventTransaction;
      if (selectedEventTransaction.agreement_type === 'none') {
        const response = await editTransaction({
          ...selectedEventTransaction.transaction,
          amount,
        });
        handleSelectedEventTransaction({
          ...oldEventTransaction,
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
      }
      handleEditAmount();
    } catch (err: any | unknown) {
      return Alert.alert('Erro na atualização', 'Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  function handleOpenUpdateTransactionDueDateWindow() {
    if (isOwner) {
      handleSelectedDate(new Date(selectedEventTransaction.transaction.due_date));
      handleSelectedDateWindow();
    }
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
      {!editAmount ? (
        <FieldContainer>
          <FieldButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
              elevation: 5,
            }}
            onPress={handleEditAmount}
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
      ) : (
        <FieldContainer>
          <CurrencyInlineFormField
            defaultValue={String(selectedEventTransaction.transaction.amount)}
            handleOnSubmit={handleUpdateTransactionAmount}
            closeComponent={handleEditAmount}
          />
        </FieldContainer>
      )}
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
          onPress={handleCancelTransactionWindow}
        >
          <DeleteIcon name="trash-2" />
        </DeleteButton>
      </FieldContainer>
    </Container>
  );
}
