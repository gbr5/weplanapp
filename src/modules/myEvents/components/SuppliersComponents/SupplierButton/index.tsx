import React, { useState, useEffect } from 'react';

import theme from '../../../../../global/styles/theme';
import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';

import { SupplierButtonInfo } from '../SupplierButtonInfo';

import {
  Container,
  SupplierIndex,
  SupplierName,
  Icon,
} from './styles';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useMyEvent } from '../../../../../hooks/myEvent';

interface IProps {
  supplier: IEventSupplierDTO;
  index: number;
}

export function SupplierButton({
  supplier,
  index,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    selectedEventSupplier,
    selectEventSupplier,
  } = useEventVariables();
  const { getSelectedUserEventTasks } = useMyEvent();

  const [supplierBody, setSupplierBody] = useState(false);

  async function handleSupplierBody() {
    if (supplierBody) {
      selectEventSupplier({} as IEventSupplierDTO)
    } else {
      if (supplier.eventWeplanSupplier && supplier.eventWeplanSupplier.weplanEventSupplier && supplier.eventWeplanSupplier.weplanEventSupplier.id) {
        await getSelectedUserEventTasks(supplier.eventWeplanSupplier.weplanEventSupplier.id);
      }
      selectEventSupplier(supplier);
    }
    setSupplierBody(!supplierBody);
  }

  useEffect(() => {
    selectedEventSupplier
      && selectedEventSupplier.id
      && selectedEventSupplier.id === supplier.id
        ? (
          setSupplierBody(true)
        ) : (
          setSupplierBody(false)
        )
  }, [selectedEventSupplier]);

  return (
    <>
      <Container
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 8,
        }}
        isActive={selectedEventSupplier.id === supplier.id}
        onPress={handleSupplierBody}
      >
        <SupplierIndex>{index}</SupplierIndex>
        <SupplierName>{supplier.name}</SupplierName>
        {supplierBody ? (
          <Icon name="chevron-up" />
        ) : (
          <Icon name="chevron-down" />
        )}
      </Container>
      {supplierBody
        && selectedEventSupplier
        && selectedEventSupplier.id
        && selectedEventSupplier.id === supplier.id && (
          <SupplierButtonInfo />
        )}
    </>
  );
}
