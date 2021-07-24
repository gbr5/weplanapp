import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';

import { Container, Title } from './styles';

export function SupplierTransactionAgreementsSection() {
  const { selectedSupplier } = useMyEvent();
  const { getEventSupplierTransactionAgreements } = useEventSuppliers();

  const [ transactionAgreements, setTransactionAgreements] = useState<IEventSupplierTransactionAgreementDTO[]>([]);

  const handleGetTransactionAgreements = useCallback(async () => {
    const response = await getEventSupplierTransactionAgreements(selectedSupplier.id);
    setTransactionAgreements(response);
  }, [selectedSupplier]);

  useEffect(() => {
    handleGetTransactionAgreements();
  }, [handleGetTransactionAgreements]);

  return (
    <Container>
      <Title>Contratos</Title>
    </Container>
  );
}
