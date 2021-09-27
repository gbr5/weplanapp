import React from 'react';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { SupplierAgreementButton } from '../SupplierAgreementButton';

import {
  Container,
  Title,
  AgreementsContainer,
} from './styles';

export function EventSupplierTransactionAgreementsSection() {
  const { eventSupplierTransactionAgreements } = useEventVariables();

  return (
    <Container>
      <Title>Contratos</Title>

      {eventSupplierTransactionAgreements.length > 0 && (
        <AgreementsContainer
          data={eventSupplierTransactionAgreements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const index = eventSupplierTransactionAgreements.findIndex(agreement => agreement.id === item.id) + 1;
            return (
              <SupplierAgreementButton
                key={item.id}
                index={index}
                agreement={item}
              />
            );
          }}
        />
      )}
    </Container>
  );
}
