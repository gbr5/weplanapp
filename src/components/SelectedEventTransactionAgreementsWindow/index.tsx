import React, { useState } from 'react';

import { useTransaction } from '../../hooks/transactions';


import WindowContainer from '../../components/WindowContainer';
import { WindowHeader } from '../../components/WindowHeader';

import {
  Container,
  AgreementsContainer,
} from './styles';
import { EventTransactionAgreementButton } from '../EventTransactionAgreementButton';

interface IProps {
  closeWindow: () => void;
  overTitle: string;
  title: string;
}

export function SelectedEventAgreementTransactionsWindow({
  closeWindow,
  overTitle,
  title,
}: IProps) {
  const {
    selectedEventTransactionAgreements,
    handleSelectedEventTransactionAgreements,
  } = useTransaction();

  function handleCloseWindow() {
    handleSelectedEventTransactionAgreements([]);
    closeWindow();
  }


  return (
    <WindowContainer
      closeWindow={handleCloseWindow}
      zIndex={16}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <WindowHeader
          overTitle={overTitle}
          title={title}
        />

        {selectedEventTransactionAgreements
          && selectedEventTransactionAgreements.length > 0 && (
            <AgreementsContainer
              data={selectedEventTransactionAgreements}
              keyExtractor={agreement => agreement.id}
              renderItem={({ item }) => {
                const index = selectedEventTransactionAgreements.findIndex(agreement => agreement.id === item.id);
                return (
                  <EventTransactionAgreementButton
                    agreement={item}
                    index={index}
                    isSelected
                    key={item.id}
                  />
              )}}
            />
          )}
      </Container>
    </WindowContainer>
  );
}
