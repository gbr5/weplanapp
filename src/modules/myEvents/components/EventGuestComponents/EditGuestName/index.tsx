import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import {
  Keyboard,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';

import theme from '../../../../../global/styles/theme';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventGuests } from '../../../../../hooks/eventGuests';

import Input from '../../../../../components/Input';
import WindowContainer from '../../../../../components/WindowContainer';
import Button from '../../../../../components/Button';


import { FormContainer, KeyboardAvoidingVueContainer } from '../../SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import {
  Container,
  FormQuestion,
  Title,
  Underline,
} from './styles';
interface IFormData {
  first_name: string;
  last_name: string;
}

interface IProps {
  closeWindow: () => void;
}

const EditGuestName: React.FC<IProps> = ({ closeWindow }) => {
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef<TextInput>(null);
  const { selectedGuest } = useMyEvent();
  const { editGuest } = useEventGuests();

  const handleSubmit = useCallback(async ({ last_name, first_name }: IFormData) => {
    await editGuest({
      ...selectedGuest,
      first_name,
      last_name,
    });
    closeWindow();
  }, [editGuest, closeWindow, selectedGuest]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      top="5%"
      left="2%"
      height="65%"
      width="96%"
      zIndex={11}
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
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Title>Editar Convidado(a)</Title>
                <Underline />

                <FormQuestion>Nome</FormQuestion>
                <Input
                  name="first_name"
                  autoCorrect={false}
                  autoCapitalize="words"
                  placeholderTextColor={theme.color.secondary}
                  icon="user"
                  placeholder={selectedGuest.first_name}
                  defaultValue={selectedGuest.first_name}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    inputRef.current?.focus();
                  }}
                />
                <FormQuestion>Sobrenome</FormQuestion>
                <Input
                  name="last_name"
                  ref={inputRef}
                  placeholderTextColor={theme.color.secondary}
                  autoCorrect={false}
                  autoCapitalize="words"
                  icon="user"
                  placeholder={selectedGuest.last_name}
                  defaultValue={selectedGuest.last_name}
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
              </Form>
            </Container>
          </FormContainer>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingVueContainer>
      <Button
        onPress={() => formRef.current?.submitForm()}
      >
        Salvar
      </Button>
    </WindowContainer>
  );
};

export default EditGuestName;
