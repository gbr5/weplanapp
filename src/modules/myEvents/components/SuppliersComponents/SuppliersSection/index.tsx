import React, { useState } from 'react';
import ShortConfirmationWindow from '../../../../../components/ShortConfirmationWindow';
import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { SupplierButton } from '../SupplierButton';

import {
  Container,
  TitleContainer,
  Title,
  AddButton,
  AddIcon,
  SuppliersMenu,
  SuppliersMenuButton,
  SuppliersMenuText,
  SuppliersContainer,
} from './styles';

export function SuppliersSection() {
  const { hiredSuppliers, notHiredSuppliers } = useMyEvent();
  const { handleAddSupplierWindow } = useEventSuppliers();
  const [hiredSuppliersSection, setHiredSuppliersSection] = useState(false);

  function handleHiredSuppliersSection(data: boolean) {
    setHiredSuppliersSection(data);
  }

  return (
    <Container>
      <TitleContainer>
        <Title>Fornecedores</Title>
        <AddButton
          onPress={handleAddSupplierWindow}
        >
          <AddIcon name="plus" />
        </AddButton>
      </TitleContainer>
      <SuppliersMenu>
        <SuppliersMenuButton
          onPress={() => handleHiredSuppliersSection(false)}
          isActive={!hiredSuppliersSection}
        >
          <SuppliersMenuText
            isActive={!hiredSuppliersSection}
          >
            Selecionados
          </SuppliersMenuText>
        </SuppliersMenuButton>
        <SuppliersMenuButton
          onPress={() => handleHiredSuppliersSection(true)}
          isActive={hiredSuppliersSection}
        >
          <SuppliersMenuText
            isActive={hiredSuppliersSection}
          >
            Contratados
          </SuppliersMenuText>
        </SuppliersMenuButton>
      </SuppliersMenu>

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
