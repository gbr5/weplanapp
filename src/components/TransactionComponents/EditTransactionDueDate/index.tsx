import React, { useRef } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useTransaction } from '../../../hooks/transactions';

import WindowContainer from '../../WindowContainer';
import { WindowHeader } from '../../WindowHeader';

import { FormContainer, KeyboardAvoidingVueContainer } from '../../../modules/myEvents/components/SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import {
  Container
} from './styles';
import Input from '../../Input';
import Button from '../../Button';
import { useState } from 'react';

interface IFormParams {
  amount: string;
}

export function EditTransactionDate() {
  const formRef = useRef<FormHandles>(null);
  const { handleEditTransactionValueWindow } = useTransaction();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: IFormParams) {
    try {
      setLoading(true);
    } catch {
      setLoading(false);
    }
  }

  return (
    <WindowContainer
      closeWindow={handleEditTransactionValueWindow}
      zIndex={15}
      top="5%"
      left="2%"
      height="50%"
      width="96%"
    >
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
            <Container>
              <WindowHeader title="Editar Valor" />
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  name="amount"

                />
              </Form>
            </Container>
            <Button
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
            >
              Entrar
            </Button>
          </FormContainer>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
