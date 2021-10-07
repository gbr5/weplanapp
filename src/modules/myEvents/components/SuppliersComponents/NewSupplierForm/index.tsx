import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import theme from '../../../../../global/styles/theme';

import ISupplierSubCategoryDTO from '../../../../../dtos/ISupplierSubCategoryDTO';

import Input from '../../../../../components/Input';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { FormButton } from '../../../../../components/FormButton';
import { FormContainer, KeyboardAvoidingVueContainer } from '../../../../../components/CreateTransactionAgreement/styles';

import {
  Container,
  FormQuestion,
  SupplierCategoryButton,
  SupplierCategoryButtonText,
} from './styles';

interface IFormData {
  name: string;
}

interface IProps {
  closeWindow: () => void;
}

const NewSupplierForm: React.FC<IProps> = ({
  closeWindow,
}) => {
  const {
    createEventSuppliers,
    loading,
    selectedSupplierCategory,
    handleSupplierCategoryWindow,
    selectSupplierCategory,
    selectSupplierSubCategory,
  } = useEventSuppliers();
  const formRef = useRef<FormHandles>(null);

  function openCategoryWindow() {
    Keyboard.dismiss();
    handleSupplierCategoryWindow();
  }

  const handleSubmit = useCallback(async ({ name }: IFormData) => {
    if (name === '') return Alert.alert('Dê um nome ao fornecedor!')
    if (selectedSupplierCategory === '') {
      openCategoryWindow();
      return Alert.alert('Primeiro é necessário definir a categoria do fornecedor!');
    };
    await createEventSuppliers({
      isHired: false,
      name,
      supplier_sub_category: selectedSupplierCategory,
      weplanUser: false,
    });
    selectSupplierCategory('')
    selectSupplierSubCategory({} as ISupplierSubCategoryDTO);
    closeWindow();
  }, [closeWindow, createEventSuppliers]);


  return (
    <WindowContainer
      closeWindow={closeWindow}
      top="5%"
      left="2%"
      height="90%"
      width="96%"
      zIndex={11}
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <WindowHeader title="Novo(a) Fornecedor(a)" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <FormQuestion>Nome</FormQuestion>
                <Input
                  name="name"
                  autoCorrect={false}
                  autoCapitalize="words"
                  placeholderTextColor={theme.color.secondary}
                  icon="user"
                  placeholder="Nome"
                  returnKeyType="next"
                  onSubmitEditing={openCategoryWindow}
                />
              </Form>

              <SupplierCategoryButton
                onPress={openCategoryWindow}
              >
                <SupplierCategoryButtonText>
                  {selectedSupplierCategory !== ''
                    ? selectedSupplierCategory
                    : 'Defina a categoria'
                  }
                </SupplierCategoryButtonText>
              </SupplierCategoryButton>
            </Container>

          </FormContainer>
        </TouchableWithoutFeedback>
        <FormButton
          loading={loading}
          handleSubmit={() => formRef.current?.submitForm()}
          text="Salvar"
        />
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
};

export default NewSupplierForm;
