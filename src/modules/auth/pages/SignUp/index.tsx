import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
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
import theme from '../../../../global/styles/theme';

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
  const [securePassword, setSecurePassword] = useState(true);
  const [securePasswordConfirmation, setSecurePasswordConfirmation] = useState(true);

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

      try {
        await api.get(`/find-user-by-email-or-user-name?name=${data.name}`);
      } catch {
        return Alert.alert(`O nome "${data.name}" não está mais disponível`, 'Escolha outro nome de usuário e tente novamente');
      }
      try {
        await api.get(`/find-user-by-email-or-user-name?email=${data.email}`);
      } catch {
        return Alert.alert(`O e-mail "${data.email}" já foi registrado`, 'Se este é o seu e-mail, faça o login ou troque a sua senha!');
      }

      if (data.password.length < 8)
        return Alert.alert('A senha deve ter pelo menos 8 caracteres');

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(8, 'Mínimo de 8 dígitos'),
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

      const newUser = await api.post('/users', validatedData);

      await api.post('user/activation', {
        email: newUser.data.email,
      });

      Alert.alert('Ative a sua conta!', 'Eviamos o link para o seu e-mail.');
      navigation.navigate('SignIn');
    } catch (err) {
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
              placeholderTextColor={theme.color.secondary}
              icon="user"
              placeholder="Nome de usuário"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
              textContentType="givenName"
            />
            <Input
              placeholderTextColor={theme.color.secondary}
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
                placeholderTextColor={theme.color.secondary}
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
                placeholderTextColor={theme.color.secondary}
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
