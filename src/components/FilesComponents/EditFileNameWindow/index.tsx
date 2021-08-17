import React, { useRef } from 'react';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import { useAuth } from '../../../hooks/auth';
import { useProfile } from '../../../hooks/profile';
import theme from '../../../global/styles/theme';

import { FormButton } from '../../FormButton';
import Input from '../../Input';
import WindowContainer from '../../WindowContainer';
import { WindowHeader } from '../../WindowHeader';

import {
  FormContainer,
  KeyboardAvoidingVueContainer,
} from '../../../modules/myEvents/components/SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import {
  Container,
  Title,
} from './styles';
import { useFiles } from '../../../hooks/files';
import { useTransaction } from '../../../hooks/transactions';

interface IFormParams {
  name: string;
}

export function EditFileNameWindow() {
  const { selectedFile, handleEditFileWindow } = useFiles();
  const { editTransactionFile, loading } = useTransaction();
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit({ name }: IFormParams) {
    if (name === '') return Alert.alert('Defina um nome único!');
    // if (name === '') return Alert.alert('Este nome já existe!');
    if (selectedFile.file_origin === 'transaction') {
      await editTransactionFile({
        name,
        id: selectedFile.id,
      });
      handleEditFileWindow();
    }
    handleEditFileWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleEditFileWindow}
      zIndex={28}
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
        <WindowHeader overTitle="Editar" title="Nome do Arquivo" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  placeholderTextColor={theme.color.secondary}
                  name="name"
                  autoCorrect={false}
                  autoCapitalize="words"
                  placeholder={selectedFile.name}
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
          elevation={15}
          loading={loading}
        />
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
