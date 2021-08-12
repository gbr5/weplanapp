import React, { useMemo } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { SupplierAgreementButton } from '../SupplierAgreementButton';

import {
  Container,
  HeaderContainer,
  AgreementsContainer,
} from './styles';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import Button from '../../../../../components/Button';
import { AddButton } from '../../../../../components/AddButton';

export function SupplierTransactionAgreementsWindow() {
  const { selectedSupplier } = useMyEvent();
  const {
    handleSupplierTransactionAgreementsWindow,
    handleCreateSupplierTransactionAgreementWindow,
  } = useEventSuppliers();

  const agreements = useMemo(() => {
    return selectedSupplier
      && selectedSupplier.id
      && selectedSupplier.transactionAgreements
        ? selectedSupplier.transactionAgreements
          .filter(agreement => !agreement.isCancelled)
        : null;
  }, [selectedSupplier]);

  return (
    <WindowContainer
      closeWindow={handleSupplierTransactionAgreementsWindow}
      zIndex={15}
      top="5%"
      left="0%"
      height="95%"
      width="100%"
    >
      <Container>
        <HeaderContainer>
          <WindowHeader overTitle={`Fornecedor: ${selectedSupplier.name}`} title="Contratos" />
          <AddButton
            onPress={handleCreateSupplierTransactionAgreementWindow}
            top="20%"
            right="5%"
          />
        </HeaderContainer>
        {agreements && agreements.length > 0 && (
          <AgreementsContainer
            data={agreements}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const index = agreements.findIndex(agreement => agreement.id === item.id) + 1;
              return (
                <SupplierAgreementButton
                  key={item.id}
                  index={index}
                  agreement={item}
                  isSupplierSelected={true}
                />
              );
            }}
          />
        )}
      </Container>
      <Button onPress={handleSupplierTransactionAgreementsWindow}>
        Fechar
      </Button>
    </WindowContainer>
  );
}
