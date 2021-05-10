import React, { useCallback, useRef, useState } from 'react';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  KeyboardAvoidingView, TextInput, ScrollView, Platform, View, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

interface ISignInFormProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

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

      // const user = await api.get<IUserDTO>(`/user-profile/${data.email}`);

      // if (!user.data.isActive) {
      //   await api.post('user/activation', {
      //     email: data.email,
      //   });
      //   setActivationMessage(true);
      //   return addToast({
      //     type: 'info',
      //     title: 'Ativação de perfil',
      //     description:
      //       'Enviamos ao seu e-mail o link para a ativação da sua conta.
      //  Este é um procedimento de segurança!',
      //   });
      // }

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

      //   return addToast({
      //     type: 'error',
      //     title: 'Erro no cadastro',
      //     description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
      //   });
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
            <Input
              ref={passwordInputRef}
              name="password"
              autoCapitalize="none"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

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
