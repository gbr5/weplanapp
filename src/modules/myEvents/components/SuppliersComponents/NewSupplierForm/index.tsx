import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput } from 'react-native';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';

import {
  Container,
  Title,
  FormQuestion,
  BooleanField,
  BooleanButton,
  BooleanButtonTitle,
  Icon,
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
    selectedSupplierSubCategory,
    handleSupplierCategoryWindow,
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
    closeWindow();
  }, [closeWindow, createEventSuppliers]);

  function handleSupplierIsHired(data: boolean) {
    setIsHired(data)
  }

  function handleSupplierWeplanUser(data: boolean) {
    setWeplanUser(data)
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      height="80%"
      left="0%"
      top="10%"
      width="100%"
      zIndex={11}
    >
      <Container>
        <Title>Novo(a) Fornecedor(a)</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormQuestion>Nome</FormQuestion>
          <Input
            name="name"
            autoCorrect={false}
            autoCapitalize="words"
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
            {
              selectedSupplierSubCategory
                && selectedSupplierSubCategory.id
                  ? selectedSupplierSubCategory.sub_category
                  : 'Escolha a categoria'
            }
          </SupplierCategoryButtonText>
        </SupplierCategoryButton>
      </Container>
      <Button
        loading={loading}
        onPress={() => formRef.current?.submitForm()}
      >
        Salvar
      </Button>
    </WindowContainer>
  );
};

export default NewSupplierForm;
