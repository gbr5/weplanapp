import React, { useCallback, useRef, useState } from 'react';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  KeyboardAvoidingView, ScrollView, Platform, View, Alert, TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';
import api from '../../../../services/api';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import logoImg from '../../../../assets/logo.png';

import {
  Container,
  Title,
  Logo,
  Icon,
  BackToSignInButton,
  BackToSignInText,
  EyeIcon,
  PasswordField,
  PasswordSecureButton,
} from './styles';
import getValidationErrors from '../../../../utils/getValidationErros';

interface ISignUPFormProps {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(false);
  const [securePasswordConfirmation, setSecurePasswordConfirmation] = useState(false);

  function handleSecurePassword() {
    setSecurePassword(!securePassword);
  }

  function handleSecurePasswordConfirmation() {
    setSecurePasswordConfirmation(!securePasswordConfirmation);
  }

  const navigateToSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const handleSignUp = useCallback(async (data: ISignUPFormProps) => {
    try {
      formRef.current?.setErrors({});
      setLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref('password'), undefined],
          'As senhas devem ser iguais.',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const validatedData = {
        name: data.name,
        email: data.email,
        password: data.password,
        isCompany: false,
      };

      await api.post('/users', validatedData);

      Alert.alert('Ative a sua conta!', 'Eviamos o link para o seu e-mail.');
      navigation.navigate('SignIn');
    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }
      Alert.alert('Erro no cadastro', 'Tente novamente!');
    } finally {
      setLoading(false);
    }
  }, [navigation]);

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
            <Title>Crie sua conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignUp}>

            <Input
              name="name"
              autoCapitalize="words"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
              textContentType="givenName"
            />
            <Input
              ref={emailInputRef}
              autoCorrect={false}
              keyboardType="email-address"
              autoCapitalize="none"
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
                autoCapitalize="none"
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry={securePassword}
                returnKeyType="next"
                onSubmitEditing={() => passwordConfirmationInputRef.current?.focus()}
                textContentType="newPassword"
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

            <PasswordField>
              <Input
                ref={passwordConfirmationInputRef}
                autoCapitalize="none"
                name="passwordConfirmation"
                icon="lock"
                placeholder="Senha"
                secureTextEntry={securePasswordConfirmation}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                textContentType="newPassword"
              />
              <PasswordSecureButton
                onPress={handleSecurePasswordConfirmation}
              >
                {securePasswordConfirmation ? (
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
            Criar conta
          </Button>

        </Container>
      </ScrollView>
      <BackToSignInButton onPress={navigateToSignIn}>
        <Icon name="arrow-left" size={20} />
        <BackToSignInText>
          Voltar para login
        </BackToSignInText>
      </BackToSignInButton>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
