import React from 'react';
import IEventTransactionDTO from '../../dtos/IEventTransactionDTO';
import { EventTransactionFlatList } from '../EventTransactionFlatList';
import WindowContainer from '../WindowContainer';
import { WindowHeader } from '../WindowHeader';

import { Container } from './styles';

interface IProps {
  overTitle: string;
  title: string;
  transactions: IEventTransactionDTO[];
  closeWindow: () => void;
}

export function EventTransactionsWindow({
  transactions,
  closeWindow,
  overTitle,
  title,
}: IProps) {
  return (
    <WindowContainer
      closeWindow={closeWindow}
      height="90%"
      left="0%"
      top="5%"
      width="100%"
      zIndex={20}
    >
      <Container>
        <WindowHeader overTitle={overTitle} title={title} />
        <EventTransactionFlatList
          month={true}
          year={true}
          transactions={transactions}
        />
      </Container>
    </WindowContainer>
  );
}
