import React, { useRef, useState, useMemo } from 'react';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../../utils/getValidationErros';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';


import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';

import { Container } from './styles';
import theme from '../../../../../global/styles/theme';
import { FormContainer, KeyboardAvoidingVueContainer } from '../../../../../components/CreateTransactionAgreement/styles';

interface IFormParams {
  description: string;
}

export function EditSupplierBudgetDescription() {
  const formRef = useRef<FormHandles>(null);
  const {
    updateSupplierBudget,
    selectedSupplierBudget,
    handleEditSupplierBudgetDescriptionWindow,
  } = useEventSuppliers();

  const [loading, setLoading] = useState(false);

  async function handleSubmit({ description }: IFormParams) {
    try {
      setLoading(true);
      await updateSupplierBudget({
        ...selectedSupplierBudget,
        description,
      });
      handleEditSupplierBudgetDescriptionWindow();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

      formRef.current?.setErrors(error);
      }
      return Alert.alert('Erro na atualização', 'Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <WindowContainer
      closeWindow={handleEditSupplierBudgetDescriptionWindow}
      zIndex={25}
      top="5%"
      left="0%"
      height="70%"
      width="100%"
    >
      <Container>
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
              <WindowHeader title="Editar Descrição" />
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  placeholderTextColor={theme.color.secondary}
                  name="description"
                  autoCorrect={false}
                  autoCapitalize="words"
                  placeholder={selectedSupplierBudget.description}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}

                />
              </Form>
          </FormContainer>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingVueContainer>
      </Container>
      <Button
        loading={loading}
        onPress={() => formRef.current?.submitForm()}
      >
        Salvar
      </Button>
    </WindowContainer>
  );
}
