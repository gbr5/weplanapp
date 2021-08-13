import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useMemo, useRef } from 'react';
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
  first_name: string;
}

export function EditGivenNameWindow() {
  const { user } = useAuth();
  const {
    updateUserPersonInfo,
    handleEditGivenNameWindow,
    loading,
    createUserPersonInfo,
  } = useProfile();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ first_name }: IFormParams) {
    if (first_name === '') return Alert.alert('Insira seu nome!');
    // if (first_name === '') return Alert.alert('Este nome já existe!');
    if (user.personInfo) {
      console.log('1')
      await updateUserPersonInfo({
        first_name,
        last_name: user.personInfo.last_name,
        person_id: user.personInfo.person_id,
      });
    } else {
      console.log('2')

      await createUserPersonInfo({
        first_name,
        last_name: '-',
        person_id: user.id,
      });
    }
    handleEditGivenNameWindow();
  }

  const placeholder = useMemo(() => {
    return user.personInfo ? user.personInfo.first_name : 'Insira seu nome!';
  }, [user]);

  return (
    <WindowContainer
      closeWindow={handleEditGivenNameWindow}
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
        <WindowHeader overTitle="Editar Perfil" title="Nome" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Title>Insira o seu nome</Title>
                <Input
                  placeholderTextColor={theme.color.secondary}
                  name="first_name"
                  autoCorrect={false}
                  autoCapitalize="words"
                  placeholder={placeholder}
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
