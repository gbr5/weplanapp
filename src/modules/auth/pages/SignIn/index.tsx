import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Platform,
  View,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../../../utils/getValidationErros';
import { useAuth } from '../../../../hooks/auth';

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
  EyeIcon,
  PasswordField,
  PasswordSecureButton,
} from './styles';

interface ISignInFormProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const [securePassword, setSecurePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleSecurePassword() {
    setSecurePassword(!securePassword);
  }

  const navigateToSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const navigateToForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  const handleSignIn = useCallback(async (data: ISignInFormProps) => {
    try {
      formRef.current?.setErrors({});
      setLoading(true);

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      return await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

      formRef.current?.setErrors(error);
      }
      return Alert.alert('Erro na autenticação', 'Tente novamente!');
    } finally {
      setLoading(false);
    }
  }, [signIn]);

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
            <Title>Faça seu login</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <PasswordField>
              <Input
                ref={passwordInputRef}
                name="password"
                autoCapitalize="none"
                icon="lock"
                placeholder="Senha"
                secureTextEntry={securePassword}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <PasswordSecureButton
                onPress={handleSecurePassword}
              >
                {securePassword ? (
                  <EyeIcon name="eye-off" />
                ) : (
                  <EyeIcon name="eye" />
                )}
              </PasswordSecureButton>
            </PasswordField>
          </Form>
          <Button
            loading={loading}
            onPress={() => formRef.current?.submitForm()}
          >
            Entrar
          </Button>
          <ForgotPasswordButton onPress={navigateToForgotPassword}>
            <ForgotPasswordText>
              Esqueci minha senha
            </ForgotPasswordText>
          </ForgotPasswordButton>
        </Container>
      </ScrollView>
      <CreateAccountButton onPress={navigateToSignUp}>
        <Icon name="log-in" size={20} />
        <CreateAccountText>
          Criar conta
        </CreateAccountText>
      </CreateAccountButton>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
