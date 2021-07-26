import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import theme from '../../../../../global/styles/theme';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventGuests } from '../../../../../hooks/eventGuests';

import WindowContainer from '../../../../../components/WindowContainer';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';

import { FormContainer, KeyboardAvoidingVueContainer } from '../../SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import { Container, FormQuestion, Title } from './styles';

interface IFormData {
  description: string;
}

interface IProps {
  closeWindow: () => void;
}

const EditGuestDescription: React.FC<IProps> = ({ closeWindow }) => {
  const formRef = useRef<FormHandles>(null);
  const { selectedGuest } = useMyEvent();
  const { editGuest, loading } = useEventGuests();

  const handleSubmit = useCallback(async ({ description }: IFormData) => {
    await editGuest({
      ...selectedGuest,
      description,
    });
    closeWindow();
  }, [editGuest, closeWindow, selectedGuest]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      top="5%"
      left="2%"
      height="50%"
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
                <FormQuestion>Descrição</FormQuestion>
                <Input
                  name="description"
                  placeholderTextColor={theme.color.secondary}
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  icon="list"
                  placeholder={selectedGuest.description !== ' ' ? selectedGuest.description : 'Descrição'}
                  defaultValue={selectedGuest.description}
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
        loading={loading}
        onPress={() => formRef.current?.submitForm()}
      >
        Salvar
      </Button>
    </WindowContainer>
  );
};

export default EditGuestDescription;
