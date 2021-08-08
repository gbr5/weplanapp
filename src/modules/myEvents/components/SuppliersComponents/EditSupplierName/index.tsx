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
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import Input from '../../../../../components/Input';
import { FormButton } from '../../../../../components/FormButton';

import { FormContainer, KeyboardAvoidingVueContainer } from '../CreateSupplierTransactionAgreement/styles';
import { Container, Title } from './styles';

interface IFormParams {
  name: string;
}

export function EditSupplierName() {
  const {
    selectedSupplier,
  } = useMyEvent();
  const {
    updateEventSupplier,
    handleEditSupplierNameWindow,
    loading,
  } = useEventSuppliers();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ name }: IFormParams) {
    if (name === '') return Alert.alert('Digite o nome do fornecedor!');
    await updateEventSupplier({
      ...selectedSupplier,
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
        <WindowHeader overTitle={`Editar Fornecedor`} title={`${selectedSupplier.name}`} />
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
                  placeholder={selectedSupplier.name}
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
