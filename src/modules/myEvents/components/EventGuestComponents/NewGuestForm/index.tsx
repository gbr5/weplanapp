import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Platform, TextInput } from 'react-native';

import Input from '../../../../../components/Input';

import {
  Container,
  Title,
  FormQuestion,
} from './styles';
import Button from '../../../../../components/Button';
import WindowContainer from '../../../../../components/WindowContainer';
import { useEventGuests } from '../../../../../hooks/eventGuests';
import { KeyboardAvoidingVueContainer } from '../../SuppliersComponents/CreateSupplierTransactionAgreement/styles';

interface IFormData {
  first_name: string;
  last_name: string;
}

interface IProps {
  closeWindow: () => void;
}

const NewGuestForm: React.FC<IProps> = ({
  closeWindow,
}) => {
  const { addNewGuest, loading } = useEventGuests();
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async (data: IFormData) => {
    await addNewGuest(data);
    closeWindow();
  }, [closeWindow, addNewGuest]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={11}
      top="10%"
      left="2%"
      height="60%"
      width="96%"
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>

          <Title>Novo(a) Convidado(a)</Title>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormQuestion>Nome</FormQuestion>
            <Input
              name="first_name"
              autoCorrect={false}
              autoCapitalize="words"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                inputRef.current?.focus();
              }}
            />
            <FormQuestion>Sobrenome</FormQuestion>
            <Input
              name="last_name"
              ref={inputRef}
              autoCorrect={false}
              autoCapitalize="words"
              icon="user"
              placeholder="Sobrenome"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>
        </Container>
        <Button
          loading={loading}
          onPress={() => formRef.current?.submitForm()}
        >
          Salvar
        </Button>
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
};

export default NewGuestForm;
