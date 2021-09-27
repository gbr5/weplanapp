import React, { useMemo } from 'react';

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
import { useEventVariables } from '../../../../../hooks/eventVariables';

export function SupplierTransactionAgreementsWindow() {
  const { selectedEventSupplier } = useEventVariables();
  const {
    handleSupplierTransactionAgreementsWindow,
    handleCreateSupplierTransactionAgreementWindow,
  } = useEventSuppliers();

  const agreements = useMemo(() => {
    return selectedEventSupplier
      && selectedEventSupplier.id
      && selectedEventSupplier.transactionAgreements
        ? selectedEventSupplier.transactionAgreements
          .filter(agreement => !agreement.isCancelled)
        : null;
  }, [selectedEventSupplier]);

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
          <WindowHeader
            overTitle={`Fornecedor: ${selectedEventSupplier.name}`}
            title="Contratos"
          />
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
              const index = agreements.findIndex(
                agreement => agreement.id === item.id) + 1;
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
