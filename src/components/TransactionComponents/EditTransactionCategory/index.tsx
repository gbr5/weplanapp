import React, { useRef } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import theme from '../../../global/styles/theme';
import { useTransaction } from '../../../hooks/transactions';

import WindowContainer from '../../WindowContainer';
import { FormContainer, KeyboardAvoidingVueContainer } from '../../../modules/myEvents/components/SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import { WindowHeader } from '../../WindowHeader';
import Input from '../../Input';
import { FormButton } from '../../FormButton';

import { Container, Title } from './styles';

interface IFormParams {
  category: string;
}

export function EditTransactionCategory() {
  const {
    selectedEventTransaction,
    editTransaction,
    handleEditTransactionCategory,
    loading,
  } = useTransaction();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ category }: IFormParams) {
    await editTransaction({
      ...selectedEventTransaction.transaction,
      category,
    });
    handleEditTransactionCategory();
  }

  return (
    <WindowContainer
      closeWindow={handleEditTransactionCategory}
      zIndex={31}
      top="5%"
      left="2%"
      height="60%"
      width="96%"
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <WindowHeader title="Editar Transação" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Title>Categoria da transação</Title>
                <Input
                  name="category"
                  placeholderTextColor={theme.color.secondary}
                  autoCorrect={false}
                  autoCapitalize="words"
                  icon="info"
                  returnKeyType="next"
                  placeholder={selectedEventTransaction.transaction.category ?? ''}
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
              </Form>
            </Container>
          </FormContainer>
        </TouchableWithoutFeedback>
        <FormButton
          loading={loading}
          text="Salvar"
          handleSubmit={() => {formRef.current?.submitForm();}}
        />
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
