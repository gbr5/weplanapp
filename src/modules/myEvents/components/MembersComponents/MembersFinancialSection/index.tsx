import React, { useMemo, useState } from 'react';
import { EventTransactionAgreementFlatList } from '../../../../../components/EventTransactionAgreementFlatList';
import { EventTransactionFlatList } from '../../../../../components/EventTransactionFlatList';
import { MenuBooleanButton } from '../../../../../components/MenuBooleanButton';
import IEventTransactionAgreementDTO from '../../../../../dtos/IEventTransactionAgreementDTO';
import IEventTransactionDTO from '../../../../../dtos/IEventTransactionDTO';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useTransaction } from '../../../../../hooks/transactions';

import {
  Container,
  Body,
  MenuContainer,
  MenuButton,
  MenuTitle,
} from './styles';

export function MembersFinancialSection() {
  const { eventMembers } = useEventVariables();
  const { sortTransactionAgreements, sortEventTransactions } = useTransaction();
  const [financialSection, setFinancialSection] = useState('Contracts');

  function handleFinancialSection(data: string) {
    setFinancialSection(data);
  }

  const transactions = useMemo(() => {
    const eventTransactions: IEventTransactionDTO[] = [];
    eventMembers.map(member => {
      member.transactionAgreements.map(agreement => {
        agreement.transactions.map(({ transaction }) => {
          eventTransactions.push({
            agreement_id: agreement.id,
            agreement_type: 'member',
            event_id: member.event_id,
            transaction,
          });
          return transaction;
        });
        return agreement;
      });
      return member;
    });
    return eventTransactions.length > 0 ? sortEventTransactions(eventTransactions) : [];
  }, [eventMembers]);

  const transactionAgreements = useMemo(() => {
    const eventTransactionAgreements: IEventTransactionAgreementDTO[] = [];
    eventMembers.map(member => {
      member.transactionAgreements.map(agreement => {
        const eventTransactions: IEventTransactionDTO[] = [];

        agreement.transactions.map(({ transaction }) => {
          eventTransactions.push({
            agreement_id: agreement.id,
            agreement_type: 'member',
            event_id: member.event_id,
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
        } = agreement;
        eventTransactionAgreements.push({
          amount,
          created_at,
          id,
          isCancelled,
          number_of_installments,
          participant_id: member_id,
          participant_name: member.userEventMember.name,
          participant_type: 'member',
          transactions: eventTransactions,
          updated_at,
          event_id: member.event_id,
        });

        return agreement;
      });
      return member;
    });
    return eventTransactionAgreements.length > 0 ? sortTransactionAgreements(eventTransactionAgreements) : [];
  }, [eventMembers]);

  return (
    <Container>
      <MenuBooleanButton
        firstActive={financialSection === 'Contracts'}
        firstFunction={() => handleFinancialSection('Contracts')}
        firstLabel="Contratos"
        secondFunction={() => handleFinancialSection('Transactions')}
        secondLabel="Transações"
      />
      <Body>
        {financialSection === 'Transactions' && transactions.length > 0 && (
          <EventTransactionFlatList
            transactions={transactions}
            year={true}
            month={true}
          />
        )}
        {financialSection === 'Contracts' && transactions.length > 0 && (
          <EventTransactionAgreementFlatList
            transactionAgreements={transactionAgreements}
          />
        )}
      </Body>
    </Container>
  );
}
