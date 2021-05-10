import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView, Text, TextInput, ScrollView, Platform, View, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import logoImg from '../../../../assets/logo.png';

import {
  Container,
  Title,
  Logo,
  Icon,
  ForgotPasswordButton,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
} from './styles';
import getValidationErrors from '../../../../utils/getValidationErros';
import { useAuth } from '../../../../hooks/auth';

interface IForgotPasswordFormProps {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const navigateToSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const navigateToSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const handleForgotPassword = useCallback(async (data: IForgotPasswordFormProps) => {
    try {
      formRef.current?.setErrors({});
      setLoading(true);

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await resetPassword(data.email);
      return navigateToSignIn();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

      formRef.current?.setErrors(error);
      }
      return Alert.alert('Erro ao redefinir a senha', 'Tente novamente!');
    } finally {
      setLoading(false);
    }
  }, [resetPassword, navigateToSignIn]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Logo source={logoImg} />
          <View>
            <Title>Redefinir Senha</Title>
          </View>
          <Form ref={formRef} onSubmit={handleForgotPassword}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>
          <Button
            loading={loading}
            onPress={() => formRef.current?.submitForm()}
          >
            Entrar
          </Button>

          <ForgotPasswordButton onPress={navigateToSignUp}>
            <ForgotPasswordText>
              Criar nova conta
            </ForgotPasswordText>
          </ForgotPasswordButton>
        </Container>
      </ScrollView>
      <CreateAccountButton onPress={navigateToSignIn}>
        <Icon name="log-in" size={20} />
        <CreateAccountText>
          Fazer login
        </CreateAccountText>
      </CreateAccountButton>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
