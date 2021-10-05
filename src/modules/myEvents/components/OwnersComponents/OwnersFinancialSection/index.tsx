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
} from './styles';

export function OwnersFinancialSection() {
  const { eventOwners } = useEventVariables();
  const { sortTransactionAgreements, sortEventTransactions } = useTransaction();
  const [financialSection, setFinancialSection] = useState('Contracts');

  function handleFinancialSection(data: string) {
    setFinancialSection(data);
  }

  const transactions = useMemo(() => {
    const eventTransactions: IEventTransactionDTO[] = [];
    eventOwners.map(owner => {
      owner.transactionAgreements.map(agreement => {
        agreement.transactions.map(({ transaction }) => {
          eventTransactions.push({
            agreement_id: agreement.id,
            agreement_type: 'owner',
            event_id: owner.event_id,
            transaction,
          });
          return transaction;
        });
        return agreement;
      });
      return owner;
    });
    return eventTransactions.length > 0 ? sortEventTransactions(eventTransactions) : [];
  }, [eventOwners]);

  const transactionAgreements = useMemo(() => {
    const eventTransactionAgreements: IEventTransactionAgreementDTO[] = [];
    eventOwners.map(owner => {
      owner.transactionAgreements.map(agreement => {
        const eventTransactions: IEventTransactionDTO[] = [];

        agreement.transactions.map(({ transaction }) => {
          eventTransactions.push({
            agreement_id: agreement.id,
            agreement_type: 'owner',
            event_id: owner.event_id,
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
        } = agreement;
        eventTransactionAgreements.push({
          amount,
          created_at,
          id,
          isCancelled,
          number_of_installments,
          participant_id: owner_id,
          participant_name: owner.userEventOwner.name,
          participant_type: 'owner',
          transactions: eventTransactions,
          updated_at,
          event_id: owner.event_id,
        });

        return agreement;
      });
      return owner;
    });
    return eventTransactionAgreements.length > 0 ? sortTransactionAgreements(eventTransactionAgreements) : [];
  }, [eventOwners]);

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
