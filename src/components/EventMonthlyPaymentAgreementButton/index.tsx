import React, { useMemo } from 'react';
import IEventMonthlyPaymentAgreementDTO from '../../dtos/IEventMonthlyPaymentAgreementDTO';

import IEventTransactionAgreementDTO from '../../dtos/IEventTransactionAgreementDTO';
import IEventTransactionDTO from '../../dtos/IEventTransactionDTO';
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
  NumberOfInstallments,
  CreatedDate,
  MenuButton,
  Icon,
} from './styles';

interface IProps {
  index: number;
  agreement: IEventMonthlyPaymentAgreementDTO;
}

export function EventMonthlyPaymentAgreementButton({
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
    selectedEvent,
    selectedEventMonthlyPaymentAgreement,
    selectEventMonthlyPaymentAgreement,
    eventOwners,
    eventMembers,
    handleEventMonthlyPaymentSettingsWindow,
    isOwner,
  } = useEventVariables();

  const { handleEventTransactions } = useEventVariables();

  const {
    handleSelectedEventTransactionAgreements,
  } = useTransaction();

  const {
    selectedEventMonthlyPaymentAgreements,
    selectedEventMonthlyPaymentAgreementTransactions,
  } = useMemo(() => {
    const selectedAgreements: IEventTransactionAgreementDTO[] = [];
    const selectedTransactions: IEventTransactionDTO[] = [];
    agreement.eventMemberTransactionAgreements.map(ma => {
      const transactions: IEventTransactionDTO[] = [];
      ma.transactions.map(({ transaction }) => {
        transactions.push({
          agreement_id: ma.id,
          agreement_type: 'member',
          event_id: selectedEvent.id,
          transaction,
        });
        selectedTransactions.push({
          agreement_id: ma.id,
          agreement_type: 'member',
          event_id: selectedEvent.id,
          transaction,
        });
        return transaction;
      });
      const {
        amount,
        created_at,
        id,
        isCancelled,
        member_id,
        number_of_installments,
        updated_at,
      } = ma;
      const findMember = eventMembers.find(member => member.id === member_id);
      selectedAgreements.push({
        amount,
        created_at,
        event_id: selectedEvent.id,
        id,
        isCancelled,
        number_of_installments,
        participant_id: member_id,
        participant_type: 'member',
        transactions,
        updated_at,
        participant_name: findMember?.userEventMember.name ?? '',
      });
      return ma;
    });
    agreement.eventOwnerTransactionAgreements.map(ma => {
      const transactions: IEventTransactionDTO[] = [];
      ma.transactions.map(({ transaction }) => {
        transactions.push({
          agreement_id: ma.id,
          agreement_type: 'owner',
          event_id: selectedEvent.id,
          transaction,
        });
        selectedTransactions.push({
          agreement_id: ma.id,
          agreement_type: 'owner',
          event_id: selectedEvent.id,
          transaction,
        });
        return transaction;
      });
      const {
        amount,
        created_at,
        id,
        isCancelled,
        owner_id,
        number_of_installments,
        updated_at,
      } = ma;
      const findOwner = eventOwners.find(owner => owner.id === owner_id);
      selectedAgreements.push({
        amount,
        created_at,
        event_id: selectedEvent.id,
        id,
        isCancelled,
        number_of_installments,
        participant_id: owner_id,
        participant_type: 'owner',
        transactions,
        updated_at,
        participant_name: findOwner?.userEventOwner.name ?? '',
      });
      return ma;
    });
    return {
      selectedEventMonthlyPaymentAgreements: selectedAgreements,
      selectedEventMonthlyPaymentAgreementTransactions: selectedTransactions,
    };
  }, [eventOwners, eventMembers, agreement]);

  function handleSelectEventMonthlyPaymentAgreement() {
    if (selectedEventMonthlyPaymentAgreement.id === agreement.id) return;
    selectEventMonthlyPaymentAgreement(agreement);
    handleSelectedEventTransactionAgreements(selectedEventMonthlyPaymentAgreements);
    handleEventTransactions(selectedEventMonthlyPaymentAgreementTransactions);
  }

  const isSelected = useMemo(() => {
    return agreement.id === selectedEventMonthlyPaymentAgreement.id;
  }, [agreement, selectedEventMonthlyPaymentAgreement,]);

  function openEventMonthlyPaymentSettingsWindow() {
    if (!isOwner) return;
    selectEventMonthlyPaymentAgreement(agreement);
    handleEventMonthlyPaymentSettingsWindow();
  }

  return (
    <Container
      isSelected={isSelected}
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 15,
      }}
      onPress={handleSelectEventMonthlyPaymentAgreement}
    >
      <MenuButton
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 5,
        }}
        onPress={openEventMonthlyPaymentSettingsWindow}
      >
        <Icon name="trash-2" />
      </MenuButton>
      <Index>{index}</Index>
      <Body>
        <NumberOfInstallments>
          {agreement.name}
        </NumberOfInstallments>
        <ContractInfo>
          <SupplierName>{formatBrlCurrency(agreement.monthly_payment)}  </SupplierName>
          <NumberOfInstallments>
            x {agreement.number_of_installments}
          </NumberOfInstallments>
        </ContractInfo>
        <CreatedDate>
          Criado dia:  {formatOnlyDateShort(String(agreement.created_at))}
        </CreatedDate>
      </Body>
    </Container>
  );
}
