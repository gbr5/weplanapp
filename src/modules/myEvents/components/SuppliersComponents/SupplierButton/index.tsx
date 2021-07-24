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
import { useState } from 'react';

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
  } = useEventSuppliers();

  const [loading, setLoading] = useState(false);

  async function updateSupplierIsHired() {
    try {
      setLoading(true);
      await updateEventSuppliers({
        ...supplier,
        isHired: !supplier.isHired,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
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
