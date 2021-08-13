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
  last_name: string;
}

export function EditFamilyNameWindow() {
  const { user } = useAuth();
  const {
    updateUserPersonInfo,
    handleEditFamilyNameWindow,
    loading,
    createUserPersonInfo,
  } = useProfile();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ last_name }: IFormParams) {
    if (last_name === '') return Alert.alert('Insira o seu sobrenome');
    // if (last_name === '') return Alert.alert('Este nome já existe!');
    if (user.personInfo) {
      await updateUserPersonInfo({
        last_name,
        first_name: user.personInfo.first_name,
        person_id: user.personInfo.person_id,
      });
    } else {
      await createUserPersonInfo({
        last_name,
        first_name: '-',
        person_id: user.id,
      });
    }
    handleEditFamilyNameWindow();
  }

  const placeholder = useMemo(() => {
    return user.personInfo ? user.personInfo.last_name : 'Insira seu sobrenome!';
  }, [user]);

  return (
    <WindowContainer
      closeWindow={handleEditFamilyNameWindow}
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
        <WindowHeader overTitle="Editar Perfil" title="Sobrenome" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Title>Insira o seu sobrenome</Title>
                <Input
                  placeholderTextColor={theme.color.secondary}
                  name="last_name"
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
