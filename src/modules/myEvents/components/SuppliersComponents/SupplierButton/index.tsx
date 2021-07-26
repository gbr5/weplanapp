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
import { SupplierButtonInfo } from '../SupplierButtonInfo';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEffect } from 'react';

interface IProps {
  supplier: IEventSupplierDTO;
  index: number;
}

export function SupplierButton({
  supplier,
  index,
}: IProps) {
  const { selectedSupplier, selectSupplier} = useMyEvent();

  const [supplierBody, setSupplierBody] = useState(false);

  function handleSupplierBody() {
    supplierBody
      ? selectSupplier({} as IEventSupplierDTO)
      : selectSupplier(supplier);
    setSupplierBody(!supplierBody);
  }

  useEffect(() => {
    selectedSupplier
      && selectedSupplier.id
      && selectedSupplier.id === supplier.id
        ? (
          setSupplierBody(true)
        ) : (
          setSupplierBody(false)
        )
  }, [selectedSupplier]);

  return (
    <>
      <Container>
        <GoToSupplierButton onPress={handleSupplierBody}>
          <SupplierIndex>{index}</SupplierIndex>
          <SupplierName>{supplier.name}</SupplierName>
          {supplierBody ? (
            <Icon name="chevron-up" />
          ) : (
            <Icon name="chevron-down" />
          )}
        </GoToSupplierButton>
      </Container>
      {supplierBody
        && selectedSupplier
        && selectedSupplier.id
        && selectedSupplier.id === supplier.id && (
          <SupplierButtonInfo />
        )}
    </>
  );
}
