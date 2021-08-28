import React, { useMemo } from 'react';
import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import theme from '../../../../../global/styles/theme';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import {
  Container,
  Index,
  Body,
  SupplierName,
  ContractInfo,
  Amount,
  NumberOfInstallments,
  StatusContainer,
  Status,
} from './styles';

interface IProps {
  index: number;
  agreement: IEventSupplierTransactionAgreementDTO;
  isSupplierSelected?: boolean;
}

export function SupplierAgreementButton({
  agreement,
  index,
  isSupplierSelected,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { eventSuppliers } = useMyEvent();
  const {
    handleEventSupplierAgreementTransactionsWindow,
    selectSupplierTransactionAgreement,
  } = useEventSuppliers();

  const supplier = useMemo(() => {
    return eventSuppliers.find(item => item.id === agreement.supplier_id);
  }, [eventSuppliers, agreement]);

  const { isOverdue, numberOfPaidTransactions } = useMemo(() => {
    const numberOfPaidTransactions = agreement.transactions
      .filter(({ transaction }) => !transaction.isCancelled && transaction.isPaid)
      .length;
    const today = new Date();
    const isOverdue = agreement.transactions
      .filter(({ transaction }) =>
        !transaction.isCancelled
        && !transaction.isPaid
        && new Date(transaction.due_date) < today
      );
    return {
      numberOfPaidTransactions,
      isOverdue: isOverdue.length > 0,
    };
  }, [agreement]);

  function handleSelectAgreement() {
    selectSupplierTransactionAgreement(agreement);
    handleEventSupplierAgreementTransactionsWindow();
  }
  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 15,
      }}
      onPress={handleSelectAgreement}
    >
      <Index>{index}</Index>
      <Body>
        {!isSupplierSelected ? (
          supplier && <SupplierName>{supplier.name}</SupplierName>
        ) : (
          <SupplierName>
            Criado dia:  {formatOnlyDateShort(String(agreement.created_at))}
          </SupplierName>
        )}
        <ContractInfo>
          <Amount>{formatBrlCurrency(agreement.amount)} | </Amount>
          <NumberOfInstallments>
            {numberOfPaidTransactions} / {agreement.number_of_installments}
          </NumberOfInstallments>
        </ContractInfo>
      </Body>
      <StatusContainer
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 15,
        }}
        isOverdue={isOverdue}
      >
        <Status
          name="flag"
          isOverdue={isOverdue}
        />
      </StatusContainer>
    </Container>
  );
}
