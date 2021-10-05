import React from 'react';
import IEventTransactionAgreementDTO from '../../dtos/IEventTransactionAgreementDTO';
import { ListEventTransactionAgreementButton } from '../ListEventTransactionAgreementButton';

import { Container } from './styles';

interface IProps {
  transactionAgreements: IEventTransactionAgreementDTO[];
}

export function EventTransactionAgreementFlatList({
  transactionAgreements,
}: IProps) {
  return (
    <Container
      data={transactionAgreements}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const index = transactionAgreements.findIndex(agreement => agreement.id === item.id) + 1;
        return (
          <ListEventTransactionAgreementButton
            agreement={item}
            index={index}
            key={item.id}
          />
        );
      }}
    />
  );
}
