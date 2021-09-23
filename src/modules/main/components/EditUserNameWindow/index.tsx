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
import api from '../../../../services/api';
import { FormContainer, KeyboardAvoidingVueContainer } from '../../../myEvents/components/SuppliersComponents/CreateSupplierTransactionAgreement/styles';

import {
  Container,
  Title,
} from './styles';

interface IFormParams {
  name: string;
}

export function EditUserNameWindow() {
  const { user } = useAuth();
  const { updateUserProfile, handleEditUserNameWindow, loading } = useProfile();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ name }: IFormParams) {
    if (name === '') return Alert.alert('Defina um nome único!');

    try {
      await api.get(`/find-user-by-email-or-user-name?name=${name}`);
    } catch {
      return Alert.alert(`O nome "${name}" não está mais disponível`, 'Escolha outro nome de usuário e tente novamente');
    }

    await updateUserProfile({
      email: user.email,
      name,
    });
    handleEditUserNameWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleEditUserNameWindow}
      zIndex={11}
      top="5%"
      left="2%"
      height="70%"
      width="96%"
      elevation={16}
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <WindowHeader overTitle="Editar Perfil" title="Nome de Usuário" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Title>Escolha um nome Único!</Title>
                <Input
                  placeholderTextColor={theme.color.secondary}
                  name="name"
                  autoCorrect={false}
                  autoCapitalize="words"
                  placeholder={user.name}
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
          elevation={15}
        />
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
