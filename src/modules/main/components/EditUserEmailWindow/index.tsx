import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useRef } from 'react';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { FormButton } from '../../../../components/FormButton';
import Input from '../../../../components/Input';
import WindowContainer from '../../../../components/WindowContainer';
import { WindowHeader } from '../../../../components/WindowHeader';
import theme from '../../../../global/styles/theme';
import { useAuth } from '../../../../hooks/auth';
import { useProfile } from '../../../../hooks/profile';
import { FormContainer, KeyboardAvoidingVueContainer } from '../../../myEvents/components/SuppliersComponents/CreateSupplierTransactionAgreement/styles';

import {
  Container,
  Title,
} from './styles';

interface IFormParams {
  email: string;
}

export function EditUserEmailWindow() {
  const { user } = useAuth();
  const { updateUserProfile, handleEditUserEmailWindow, loading } = useProfile();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ email }: IFormParams) {
    if (email === '') return Alert.alert('Defina um nome único!');
    // if (email === '') return Alert.alert('Este nome já existe!');
    await updateUserProfile({
      name: user.name,
      email,
    });
    handleEditUserEmailWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleEditUserEmailWindow}
      zIndex={11}
      top="5%"
      left="2%"
      height="70%"
      width="96%"
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <WindowHeader overTitle="Editar Perfil" title="Email da Conta" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Title>E-mail para o login e notificações</Title>
                <Input
                  placeholderTextColor={theme.color.secondary}
                  name="email"
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  keyboardAppearance="light"
                  placeholder={user.email}
                  returnKeyType="send"
                  onSubmitEditing={() => formRef.current?.submitForm()}
                />
              </Form>
            </Container>
          </FormContainer>
        </TouchableWithoutFeedback>
        <FormButton
          handleSubmit={() => formRef.current?.submitForm()}
          text="Salvar"
          loading={loading}
        />
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
