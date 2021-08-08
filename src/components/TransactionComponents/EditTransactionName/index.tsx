import React, { useRef } from 'react';
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
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
  name: string;
}

export function EditTransactionName() {
  const {
    selectedEventTransaction,
    editTransaction,
    handleEditTransactionName,
    loading,
  } = useTransaction();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ name }: IFormParams) {
    if (name === '') return Alert.alert('Digite o nome da transação!');
    await editTransaction({
      ...selectedEventTransaction.transaction,
      name,
    });
    handleEditTransactionName();
  }

  return (
    <WindowContainer
      closeWindow={handleEditTransactionName}
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
                <Title>Nome da transação</Title>
                <Input
                  name="name"
                  placeholderTextColor={theme.color.secondary}
                  autoCorrect={false}
                  autoCapitalize="words"
                  icon="info"
                  returnKeyType="next"
                  placeholder={selectedEventTransaction.transaction.name}
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
