import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import theme from '../../../../../global/styles/theme';

import ISupplierSubCategoryDTO from '../../../../../dtos/ISupplierSubCategoryDTO';

import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';

import { FormContainer, KeyboardAvoidingVueContainer } from '../CreateSupplierTransactionAgreement/styles';
import {
  Container,
  FormQuestion,
  BooleanField,
  BooleanButton,
  BooleanButtonTitle,
  Icon,
  SupplierCategoryButton,
  SupplierCategoryButtonText,
} from './styles';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { FormButton } from '../../../../../components/FormButton';

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
    selectedSupplierSubCategory,
    handleSupplierCategoryWindow,
    selectSupplierCategory,
    selectSupplierSubCategory,
  } = useEventSuppliers();
  const formRef = useRef<FormHandles>(null);

  const [isHired, setIsHired] = useState(false)
  const [weplanUser, setWeplanUser] = useState(false)

  const handleSubmit = useCallback(async ({ name }: IFormData) => {
    await createEventSuppliers({
      isHired,
      name,
      supplier_sub_category: selectedSupplierSubCategory.sub_category,
      weplanUser,
    });
    selectSupplierCategory('')
    selectSupplierSubCategory({} as ISupplierSubCategoryDTO);
    closeWindow();
  }, [closeWindow, createEventSuppliers]);

  function handleSupplierIsHired() {
    setIsHired(!isHired);
  }

  function handleSupplierWeplanUser() {
    setWeplanUser(!weplanUser);
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      top="5%"
      left="2%"
      height="87%"
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
                />
              </Form>
              <BooleanField>
                <BooleanButtonTitle>Contratado?</BooleanButtonTitle>
                <BooleanButton
                  onPress={handleSupplierIsHired}
                >
                  {isHired ? (
                    <Icon name="check-square" />
                  ) : (
                    <Icon name="square" />
                  )}
                </BooleanButton>
              </BooleanField>

              <BooleanField>
                <BooleanButtonTitle>Usuário WePlan?</BooleanButtonTitle>
                <BooleanButton
                  onPress={handleSupplierWeplanUser}
                >
                  {weplanUser ? (
                    <Icon name="check-square" />
                  ) : (
                    <Icon name="square" />
                  )}
                </BooleanButton>
              </BooleanField>

              <SupplierCategoryButton
                onPress={handleSupplierCategoryWindow}
              >
                <SupplierCategoryButtonText>
                  {selectedSupplierSubCategory
                    && selectedSupplierSubCategory.id
                      ? selectedSupplierSubCategory.sub_category
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
