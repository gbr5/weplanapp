import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import uuid from 'react-native-uuid'
// import { AppleButton, appleAuthAndroid, appleAuth } from '@invertase/react-native-apple-authentication';

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
  SocialButton,
  SocialText,
} from './styles';
import theme from '../../../../global/styles/theme';

interface ISignInFormProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn, signInWithGoogle } = useAuth();
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

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    console.log({ idToken });

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log({ googleCredential });

    // Sign-in the user with the credential
    const {
      user,
      additionalUserInfo
    } = await auth().signInWithCredential(googleCredential);
    console.log(user, additionalUserInfo);
    if (!user) return Alert.alert('Perfil não encontrado!');
    if (!additionalUserInfo?.profile) return Alert.alert('Perfil não encontrado!');
    if (user.email === null)
      return Alert.alert('E-mail não encontrado!');
    if (user.displayName === null)
      return Alert.alert('Nome não encontrado!');
    await signInWithGoogle({
      email: user.email ?? '',
      familyName: additionalUserInfo?.profile?.family_name ?? '',
      givenName: additionalUserInfo?.profile?.given_name ?? '',
      googleId: user.uid,
      googleToken: idToken ?? '',
      imageUrl: '',
      name: user.displayName ?? '',
    });

  }

  const isAndroid = useMemo(() => {
    return Platform.OS === 'android';
  }, []);
  // const isIosSupported = useMemo(() => {
  //   return Platform.OS === 'ios' && appleAuth.isSupported;
  // }, []);
  // const isAndroidSupported = useMemo(() => {
  //   return Platform.OS === 'android' && appleAuthAndroid.isSupported;
  // }, []);
  // async function onAppleButtonPress() {
  //   if (Platform.OS === 'ios') {
  //     // performs login request
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });
  //     Alert.alert(`1) e-mail: ${appleAuth.Scope.EMAIL}; name: ${appleAuth.Scope.FULL_NAME}`);
  //     // get current authentication state for user
  //     // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  //     const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  //     // use credentialState response to ensure the user is authenticated
  //     if (credentialState === appleAuth.State.AUTHORIZED) {
  //       // user is authenticated
  //       Alert.alert(`2) e-mail: ${appleAuth.Scope.EMAIL}; name: ${appleAuth.Scope.FULL_NAME}`);
  //     }
  //   } else {
  //     console.log('0 ===>');
  //   // Generate secure, random values for state and nonce
  //     const rawNonce = String(uuid.v4());
  //     console.log({rawNonce})
  //     const state = String(uuid.v4());
  //     console.log('1 ===>');
  //     // Configure the request
  //     appleAuthAndroid.configure({
  //       // The Service ID you registered with Apple
  //       clientId: '8GHG8T4LCM.com.weplanapp-',
  //       // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
  //       // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
  //       // redirectUri: '830691338585-ke1h9fjn2r15lk7kqmhe4f7pbv7vq4l6.apps.googleusercontent.com',
  //       redirectUri: 'com.googleusercontent.apps.830691338585-ke1h9fjn2r15lk7kqmhe4f7pbv7vq4l6',
  //       // The type of response requested - code, id_token, or both.
  //       responseType: appleAuthAndroid.ResponseType.ALL,
  //       // The amount of user information requested from Apple.
  //       scope: appleAuthAndroid.Scope.ALL,
  //       // Random nonce value that will be SHA256 hashed before sending to Apple.
  //       nonce: rawNonce,
  //       // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
  //       state,
  //     });
  //     console.log({appleAuthAndroid});
  //     // Open the browser window for user sign in
  //     const response = await appleAuthAndroid.signIn();
  //     console.log(response);
  //     // Send the authorization code to your backend for verification
  //   }
  // }

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
          {isAndroid && (
            <SocialButton
              onPress={onGoogleButtonPress}
            >
              <SocialText>
                Entrar com Google
              </SocialText>
            </SocialButton>
          )}
          {/* {isIosSupported && (
            <AppleButton
              buttonStyle={AppleButton.Style.WHITE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                width: 160, // You must specify a width
                height: 45, // You must specify a height
              }}
              onPress={() => onAppleButtonPress()}
            />
          )} */}
          {/* {isAndroidSupported && (
            <AppleButton
              buttonStyle={AppleButton.Style.WHITE}
              buttonType={AppleButton.Type.SIGN_IN}
              onPress={() => onAppleButtonPress()}
            />
          )} */}
          <View>
            <Title>Faça seu login</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              placeholderTextColor={theme.color.secondary}
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
                placeholderTextColor={theme.color.secondary}
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
