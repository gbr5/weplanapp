import React, { useState } from 'react';
import { MenuBooleanButton } from '../../../../../components/MenuBooleanButton';
import { SectionHeader } from '../../../../../components/SectionHeader';
import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { SupplierButton } from '../SupplierButton';

import {
  Container,
  SuppliersContainer,
} from './styles';

export function SuppliersSection() {
  const { isOwner } = useEventVariables();
  const {
    hiredSuppliers,
    notHiredSuppliers,
    handleSectionDescriptionWindow,
  } = useMyEvent();
  const { handleAddSupplierWindow } = useEventSuppliers();
  const [hiredSuppliersSection, setHiredSuppliersSection] = useState(true);

  function handleHiredSuppliersSection(data: boolean) {
    setHiredSuppliersSection(data);
  }

  function handleNewSupplierWindow() {
    isOwner && handleAddSupplierWindow();
  }

  return (
    <Container>
      <SectionHeader
        handleAddButton={handleNewSupplierWindow}
        handleInfoButton={handleSectionDescriptionWindow}
        title="Fornecedores"
      />
      <MenuBooleanButton
        firstActive={!hiredSuppliersSection}
        firstFunction={() => handleHiredSuppliersSection(false)}
        firstLabel="Selecionados"
        secondFunction={() => handleHiredSuppliersSection(true)}
        secondLabel="Contratados"
      />
      {hiredSuppliersSection ? (
        <SuppliersContainer
          data={hiredSuppliers}
          keyExtractor={(item: IEventSupplierDTO) => item.id}
          renderItem={({ item }) => (
            <SupplierButton
              key={item.id}
              index={hiredSuppliers.findIndex(supplier => supplier.id === item.id) + 1}
              supplier={item}
            />
          )}
        />
      ) : (
        <SuppliersContainer
          data={notHiredSuppliers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SupplierButton
              key={item.id}
              index={notHiredSuppliers.findIndex(supplier => supplier.id === item.id) + 1}
              supplier={item}
            />
          )}
        />
      )}
    </Container>
  );
}
