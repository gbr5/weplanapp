import React from 'react';
import { useMemo } from 'react';
import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { SupplierAgreementButton } from '../SupplierAgreementButton';

import {
  Container,
  Title,
  AgreementsContainer,
} from './styles';

export function EventSupplierTransactionAgreementsSection() {
  const {
    eventSuppliers,
  } = useMyEvent();

  const supplierAgreements = useMemo(() => {
    const findAgreements: IEventSupplierTransactionAgreementDTO[] = [];
    eventSuppliers.map(supplier => {
      supplier.transactionAgreements
        .filter(agreement => !agreement.isCancelled)
        .map(agreement => findAgreements.push(agreement));
      return supplier;
    });
    return findAgreements;
  }, [eventSuppliers]);

  return (
    <Container>
      <Title>Contratos</Title>

      {supplierAgreements.length > 0 && (
        <AgreementsContainer
          data={supplierAgreements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const index = supplierAgreements.findIndex(agreement => agreement.id === item.id) + 1;
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
