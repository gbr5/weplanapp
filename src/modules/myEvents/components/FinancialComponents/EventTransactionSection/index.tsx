import React, { useMemo } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import IEventTransactionDTO from '../../../../../dtos/IEventTransactionDTO';
import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';

import { EventTransactionButton } from '../../../../../components/TransactionComponents/EventTransactionButton';

import {
  Container,
  Title,
  TransactionContainer,
} from './styles';

export function EventTransactionSection() {
  const { eventSuppliers, selectedEvent } = useMyEvent();
  const { eventTransactions } = useTransaction();

  const transactions = useMemo<IEventTransactionDTO[]>(() => {
    return eventTransactions.map(transaction => {
      const supplierAgreements: IEventSupplierTransactionAgreementDTO[] = [];
      eventSuppliers.map(supplier => {
        const agreement  = supplier.transactionAgreements.find(thisAgreement => {
          const findTransaction = !!thisAgreement.transactions.find(item => item.transaction.id === transaction.id);
          return findTransaction ? supplierAgreements.push(thisAgreement) : undefined;
        });
        return agreement;
      });
      const agreement_type = supplierAgreements.length > 0 ? 'supplier' : 'none';
      return {
        event_id: selectedEvent.id,
        transaction,
        agreement_type,
        agreement_id: agreement_type === 'supplier' ? supplierAgreements[0].id : 'none',
      };
    })
    .sort((a, b) => {
      if (new Date(a.transaction.due_date) > new Date(b.transaction.due_date)) return 1;
      if (new Date(a.transaction.due_date) < new Date(b.transaction.due_date)) return -1;
      return 0;
    });
  }, [eventSuppliers, eventTransactions]);

  return (
    <Container>
      <Title>Transações</Title>
      {transactions
        && transactions.length > 0 && (
        <TransactionContainer
          data={transactions}
          keyExtractor={(item) => item.transaction.id}
          renderItem={({ item }) => {
            const index = String(transactions.findIndex(transaction => transaction.transaction.id === item.transaction.id) + 1);
            return (
              <EventTransactionButton
                key={item.transaction.id}
                index={index}
                eventTransaction={item}
              />
            );
          }}
        />
      )}
    </Container>
  );
}
