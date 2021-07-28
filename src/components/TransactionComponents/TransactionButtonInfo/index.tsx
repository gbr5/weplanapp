import React from 'react';
import { useMemo } from 'react';
import ITransactionDTO from '../../../dtos/ITransactionDTO';
import theme from '../../../global/styles/theme';
import { useEventSuppliers } from '../../../hooks/eventSuppliers';
import { useTransaction } from '../../../hooks/transactions';
import { formatBrlCurrency } from '../../../utils/formatBrlCurrency';
import formatOnlyDate from '../../../utils/formatOnlyDate';

import {
  Container,
  FieldContainer,
  FieldText,
  FieldButton,
  FieldButtonText,
  PaidButton,
  PaidIcon,
  DeleteButton,
  DeleteIcon,
} from './styles';

interface IProps {
  editTransactionValue: (data: ITransactionDTO) => void;
  cancelTransaction: (data: ITransactionDTO) => void;
}

export function TransactionButtonInfo({
  cancelTransaction,
  editTransactionValue,
}: IProps) {
  const {
    selectedTransaction,
    handleEditTransactionDueDateWindow,
  } = useTransaction();

  const color = useMemo(() => {
    const today = new Date();
    if (selectedTransaction.isPaid)
      return theme.color.success_light;
    if (new Date(selectedTransaction.due_date) < today)
      return theme.color.atention_light;
    return theme.color.info_light;
  }, [selectedTransaction.isPaid, selectedTransaction.due_date, theme]);

  function handleEditTransactionValue() {
    editTransactionValue(selectedTransaction);
  }

  function handleCancelTransaction() {
    cancelTransaction(selectedTransaction);
  }

  return (
    <Container>
      <FieldContainer>
        <FieldButton
          onPress={handleEditTransactionValue}
        >
          <FieldButtonText>
            {formatBrlCurrency(Number(selectedTransaction.amount))}
          </FieldButtonText>
        </FieldButton>
        <FieldButton
          onPress={handleEditTransactionDueDateWindow}
        >
          <FieldButtonText>
            {formatOnlyDate(String(selectedTransaction.due_date))}
          </FieldButtonText>
        </FieldButton>
      </FieldContainer>
      <FieldContainer>
        <PaidButton
          color={color}
          onPress={() => {}}
        >
          {selectedTransaction.isPaid ? (
            <>
              <FieldText>Paga</FieldText>
              <PaidIcon name="check-square" />
            </>
          ) : (
            <>
              <FieldText>Pagar</FieldText>
              <PaidIcon name="square" />
            </>
          )}
        </PaidButton>
        <DeleteButton
          onPress={handleCancelTransaction}
        >
          <DeleteIcon name="trash-2" />
        </DeleteButton>
      </FieldContainer>

    </Container>
  );
}
