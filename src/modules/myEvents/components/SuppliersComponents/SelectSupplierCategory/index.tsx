import React from 'react';
import WindowContainer from '../../../../../components/WindowContainer';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import {
  Container,
  Title,
  CategoryButton,
  CategoryButtonText,
} from './styles';

export function SelectSupplierCategory() {
  const {
    selectSupplierCategory,
    selectedSupplierCategory,
    handleSupplierCategoryWindow,
    handleSupplierSubCategoryWindow,
  } = useEventSuppliers();

  function handleSelectSupplierCategory(category: string) {
    selectSupplierCategory(category);
    handleSupplierCategoryWindow();
    handleSupplierSubCategoryWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleSupplierCategoryWindow}
      zIndex={15}
      backdropZIndex={14}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <Title>Selecione a Categoria</Title>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Catering'}
          onPress={() => handleSelectSupplierCategory('Catering')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Catering'}
          >
            Buffet
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Planning'}
          onPress={() => handleSelectSupplierCategory('Planning')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Planning'}
          >
            Planejamento
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Event_Design'}
          onPress={() => handleSelectSupplierCategory('Event_Design')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Event_Design'}
          >
            Decoração
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Venue'}
          onPress={() => handleSelectSupplierCategory('Venue')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Venue'}
          >
            Espaços
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Film_And_Photography'}
          onPress={() => handleSelectSupplierCategory('Film_And_Photography')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Film_And_Photography'}
          >
            Filmagem e Fotos
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Dance_Floors_Structures_And_Lighting'}
          onPress={() => handleSelectSupplierCategory('Dance_Floors_Structures_And_Lighting')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Dance_Floors_Structures_And_Lighting'}
          >
            Boate, Estruturas e Luz Cênica
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Bartenders_And_Drinks'}
          onPress={() => handleSelectSupplierCategory('Bartenders_And_Drinks')}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Bartenders_And_Drinks'}
          >
            Serviço de Bar e Bebidas
          </CategoryButtonText>
        </CategoryButton>
      </Container>
    </WindowContainer>
  );
}
