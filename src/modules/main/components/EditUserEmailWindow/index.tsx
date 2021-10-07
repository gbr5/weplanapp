import React, { useRef } from 'react';
import * as Yup from 'yup';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import theme from '../../../../global/styles/theme';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import { useProfile } from '../../../../hooks/profile';

import { FormButton } from '../../../../components/FormButton';
import Input from '../../../../components/Input';
import WindowContainer from '../../../../components/WindowContainer';
import { WindowHeader } from '../../../../components/WindowHeader';

import {
  Container,
  Title,
} from './styles';
import getValidationErrors from '../../../../utils/getValidationErros';
import { FormContainer, KeyboardAvoidingVueContainer } from '../../../../components/CreateTransactionAgreement/styles';

interface IFormParams {
  email: string;
}

export function EditUserEmailWindow() {
  const { user } = useAuth();
  const { updateUserProfile, handleEditUserEmailWindow, loading } = useProfile();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit(data: IFormParams) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      const { email } = data;
      try {
        await api.get(`/find-user-by-email-or-user-name?email=${email}`);
      } catch {
        return Alert.alert(`${email} já foi registrado`, 'Se este é o seu e-mail, troque a sua senha, ou entre em contato para resgatar a sua conta!');
      }

      await updateUserProfile({
        name: user.name,
        email,
      });
      handleEditUserEmailWindow();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

      formRef.current?.setErrors(error);
      }
      return Alert.alert('Insira um e-mail válido!');
    }
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
                  textContentType="emailAddress"
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
