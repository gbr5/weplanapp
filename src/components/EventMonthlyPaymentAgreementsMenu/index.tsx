import React from 'react';
import { useEventVariables } from '../../hooks/eventVariables';
import { useTransaction } from '../../hooks/transactions';
import { EventMonthlyPaymentAgreementButton } from '../EventMonthlyPaymentAgreementButton';
import { EventTransactionAgreementButton } from '../EventTransactionAgreementButton';

import {
  Container,
} from './styles';

export function EventMonthlyPaymentAgreementsMenu() {
  const { eventMonthlyPaymentAgreements } = useEventVariables();

  return (
    <Container horizontal>
      {eventMonthlyPaymentAgreements.length > 0 &&
        eventMonthlyPaymentAgreements.map(agreement => {
          const index = eventMonthlyPaymentAgreements.findIndex(item => item.id === agreement.id) + 1;
          return (
            <EventMonthlyPaymentAgreementButton
              key={agreement.id}
              agreement={agreement}
              index={index}
            />
          );
        }
      )}
    </Container>
  );
}
