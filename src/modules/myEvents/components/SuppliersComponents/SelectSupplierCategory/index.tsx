import React from 'react';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import theme from '../../../../../global/styles/theme';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import {
  Container,
  CategoryButton,
  CategoryButtonText,
} from './styles';

export function SelectSupplierCategory() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    selectSupplierCategory,
    selectedSupplierCategory,
    handleSupplierCategoryWindow,
  } = useEventSuppliers();

  function handleSelectSupplierCategory(category: string) {
    selectSupplierCategory(category);
    handleSupplierCategoryWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleSupplierCategoryWindow}
      zIndex={15}
      backdropZIndex={14}
      top="5%"
      left="0%"
      height="65%"
      width="100%"
    >
      <Container>
        <WindowHeader overTitle="Novo(a) Fornecedor(a)" title="Categoria" />
        <CategoryButton
          isActive={selectedSupplierCategory === 'Comes & Bebes'}
          onPress={() => handleSelectSupplierCategory('Comes & Bebes')}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Comes & Bebes'}
          >
            Comes & Bebes
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Planejamento'}
          onPress={() => handleSelectSupplierCategory('Planejamento')}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Planejamento'}
          >
            Planejamento
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Decoração'}
          onPress={() => handleSelectSupplierCategory('Decoração')}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Decoração'}
          >
            Decoração
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Estrutura'}
          onPress={() => handleSelectSupplierCategory('Estrutura')}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Estrutura'}
          >
            Estrutura
          </CategoryButtonText>
        </CategoryButton>
        <CategoryButton
          isActive={selectedSupplierCategory === 'Atrações'}
          onPress={() => handleSelectSupplierCategory('Atrações')}
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          <CategoryButtonText
            isActive={selectedSupplierCategory === 'Atrações'}
          >
            Atrações
          </CategoryButtonText>
        </CategoryButton>
      </Container>
    </WindowContainer>
  );
}
