import React, { useRef } from 'react';
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import theme from '../../../../../global/styles/theme';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import Input from '../../../../../components/Input';
import { FormButton } from '../../../../../components/FormButton';

import { Container, Title } from './styles';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { FormContainer, KeyboardAvoidingVueContainer } from '../../../../../components/CreateTransactionAgreement/styles';

interface IFormParams {
  name: string;
}

export function EditSupplierName() {
  const { selectedEventSupplier } = useEventVariables();
  const {
    updateEventSupplier,
    handleEditSupplierNameWindow,
    loading,
  } = useEventSuppliers();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ name }: IFormParams) {
    if (name === '') return Alert.alert('Digite o nome do fornecedor!');
    await updateEventSupplier({
      ...selectedEventSupplier,
      name,
    });
    handleEditSupplierNameWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleEditSupplierNameWindow}
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
        <WindowHeader
          overTitle={`Editar Fornecedor`}
          title={`${selectedEventSupplier.name}`}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Title>Nome do Fornecedor</Title>
                <Input
                  name="name"
                  placeholderTextColor={theme.color.secondary}
                  autoCorrect={false}
                  autoCapitalize="words"
                  icon="info"
                  returnKeyType="next"
                  placeholder={selectedEventSupplier.name}
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
