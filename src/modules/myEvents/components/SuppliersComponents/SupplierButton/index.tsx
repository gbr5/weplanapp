import React from 'react';
import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';

import {
  Container,
  GoToSupplierButton,
  SupplierConfirmationButton,
  SupplierIndex,
  SupplierName,
  Icon,
} from './styles';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

interface IProps {
  supplier: IEventSupplierDTO;
  index: number;
}

export function SupplierButton({
  supplier,
  index,
}: IProps) {
  const {
    updateEventSuppliers,
    loading,
  } = useEventSuppliers();
  async function updateSupplierIsHired() {
    await updateEventSuppliers({
      ...supplier,
      isHired: !supplier.isHired,
    });
  }

  return (
    <Container>
      <GoToSupplierButton>
        <SupplierIndex>{index}</SupplierIndex>
        <SupplierName>{supplier.name}</SupplierName>
      </GoToSupplierButton>
      {loading ? (
        <Icon name="loader" />
      ) : (
        <SupplierConfirmationButton
          isHired={supplier.isHired}
          onPress={updateSupplierIsHired}
        >
          {supplier.isHired ? (
            <Icon name="check-square" />
          ) : (
            <Icon name="square" />
          )}
        </SupplierConfirmationButton>
      )}
    </Container>
  );
}
