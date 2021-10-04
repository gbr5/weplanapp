import React, { useMemo } from 'react';

import IEventTransactionAgreementDTO from '../../dtos/IEventTransactionAgreementDTO';
import theme from '../../global/styles/theme';
import { useEventMembers } from '../../hooks/eventMembers';
import { useEventOwners } from '../../hooks/eventOwners';
import { useEventSuppliers } from '../../hooks/eventSuppliers';
import { useEventVariables } from '../../hooks/eventVariables';
import { useTransaction } from '../../hooks/transactions';
import { formatBrlCurrency } from '../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../utils/formatOnlyDateShort';

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
  CreatedDate,
} from './styles';

interface IProps {
  index: number;
  agreement: IEventTransactionAgreementDTO;
  isSelected?: boolean;
  name?: boolean;
}

export function EventTransactionAgreementButton({
  agreement,
  index,
  isSelected,
  name,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    eventOwners,
    eventMembers,
    eventSuppliers,
  } = useEventVariables();
  const {
    handleSelectedEventTransactionAgreement,
    selectedEventTransactionAgreement,
  } = useTransaction();

  const participantName = useMemo(() => {
    if (!name) return '';
    if (agreement.participant_type === 'owner') {
      const findOwner = eventOwners.find(item => item.id === agreement.participant_id);
      if (findOwner) return `${findOwner.userEventOwner.name}`;
    }
    if (agreement.participant_type === 'member') {
      const findMember = eventMembers.find(item => item.id === agreement.participant_id);
      if (findMember) return `${findMember.userEventMember.name}`;
    }
    if (agreement.participant_type === 'supplier') {
      const findSupplier = eventSuppliers.find(item => item.id === agreement.participant_id);
      if (findSupplier) return `${findSupplier.name}`;
    }
    return '';
  }, []);

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

  return (
    <Container
      isSelected={agreement.id === selectedEventTransactionAgreement.id}
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 15,
      }}
      onPress={() => handleSelectedEventTransactionAgreement(agreement)}
    >
      <Index>{index}</Index>
      <Body>
        {name && (
          <NumberOfInstallments>
            Contrato com: {participantName}
          </NumberOfInstallments>
        )}
        <ContractInfo>
          <SupplierName>{formatBrlCurrency(agreement.amount)}  </SupplierName>
          <NumberOfInstallments>
            Nº {numberOfPaidTransactions} / {agreement.number_of_installments}
          </NumberOfInstallments>
        </ContractInfo>
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
        <CreatedDate>
          Criado dia:  {formatOnlyDateShort(String(agreement.created_at))}
        </CreatedDate>
      </Body>
    </Container>
  );
}
