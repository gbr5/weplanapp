import React from 'react';
import WindowContainer from '../../../../../components/WindowContainer';
import ISupplierSubCategoryDTO from '../../../../../dtos/ISupplierSubCategoryDTO';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import {
  Container,
  Title,
  SubCategoryButton,
  SubCategoryButtonText,
  GoBackButton,
  GoBackButtonText,
} from './styles';

export function SelectSupplierSubCategory() {
  const {
    handleSupplierSubCategoryWindow,
    handleSupplierCategoryWindow,
    supplierSubCategories,
    selectedSupplierSubCategory,
    selectSupplierSubCategory,
  } = useEventSuppliers();

  function handleSelectSupplierSubCategory(subCategory: ISupplierSubCategoryDTO) {
    selectSupplierSubCategory(subCategory);
    handleSupplierSubCategoryWindow();
  }

  function goBackToSupplierCategoryWindow() {
    handleSupplierSubCategoryWindow();
    handleSupplierCategoryWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleSupplierSubCategoryWindow}
      zIndex={15}
      backdropZIndex={14}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <GoBackButton
          onPress={goBackToSupplierCategoryWindow}
          >
          <GoBackButtonText>
            Voltar para Categoria
          </GoBackButtonText>
        </GoBackButton>
        <Title>Selecione a Sub Categoria</Title>
        {supplierSubCategories.map(subCategory => {
          return (
            <SubCategoryButton
              isActive={subCategory.sub_category === selectedSupplierSubCategory.sub_category}
              onPress={() => handleSelectSupplierSubCategory(subCategory)}
            >
              <SubCategoryButtonText
                isActive={subCategory.sub_category === selectedSupplierSubCategory.sub_category}
              >
                {subCategory.sub_category}
              </SubCategoryButtonText>
            </SubCategoryButton>
          );
        })}
      </Container>
    </WindowContainer>
  );
}
