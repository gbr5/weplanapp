import React, { useMemo } from 'react';

import IEventTransactionAgreementDTO from '../../dtos/IEventTransactionAgreementDTO';
import theme from '../../global/styles/theme';
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
  Name,
  NumberOfInstallments,
  StatusContainer,
  Status,
  CreatedDate,
} from './styles';

interface IProps {
  index: number;
  agreement: IEventTransactionAgreementDTO;
}

export function ListEventTransactionAgreementButton({
  agreement,
  index,
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
    handleEventTransactionsWindow,
  } = useTransaction();

  const participantName = useMemo(() => {
    if (agreement.participant_name) return agreement.participant_name;
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

  function handleOpenAgreementTransactionsWindow() {
    handleSelectedEventTransactionAgreement(agreement);
    handleEventTransactionsWindow();
  }

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
      onPress={handleOpenAgreementTransactionsWindow}
    >
      <Name>
        Contrato com: {participantName}
      </Name>
      <Body>
        <Index>{index}</Index>

        <ContractInfo>
          <SupplierName>{formatBrlCurrency(agreement.amount)}  </SupplierName>
          <NumberOfInstallments>
            Nº {numberOfPaidTransactions} / {agreement.number_of_installments}
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
      <CreatedDate>
        Criado dia:  {formatOnlyDateShort(String(agreement.created_at))}
      </CreatedDate>
    </Container>
  );
}
