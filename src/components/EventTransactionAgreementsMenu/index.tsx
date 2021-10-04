import React from 'react';
import { useTransaction } from '../../hooks/transactions';
import { EventTransactionAgreementButton } from '../EventTransactionAgreementButton';

import {
  Container,
} from './styles';

export function EventTransactionAgreementsMenu() {
  const {
    selectedEventTransactionAgreements,
    selectedEventTransactionAgreement,
  } = useTransaction();

  return (
    <Container horizontal>
      {selectedEventTransactionAgreements.length > 0 &&
        selectedEventTransactionAgreements.map(agreement => {
          const index = selectedEventTransactionAgreements.findIndex(item => item.id === agreement.id) + 1;
          const isSelected = selectedEventTransactionAgreement
            && selectedEventTransactionAgreement.id
              ? agreement.id === selectedEventTransactionAgreement.id
              : false;
          return (
            <EventTransactionAgreementButton
              key={agreement.id}
              agreement={agreement}
              index={index}
              isSelected={isSelected}
            />
          );
        }
      )}
    </Container>
  );
}
