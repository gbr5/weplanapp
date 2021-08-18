import React, { useState, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import theme from '../../../../../global/styles/theme';

import { useMyEvent } from '../../../../../hooks/myEvent';

import Button from '../../../../../components/Button';
import Input from '../../../../../components/Input';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useEventOwners } from '../../../../../hooks/eventOwners';

import { FormContainer, KeyboardAvoidingVueContainer } from '../../SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import {
  Container,
} from './styles'
import { useFriends } from '../../../../../hooks/friends';

interface IFormParams {
  description: string;
}

export function CreateOwnerForm() {
  const formRef = useRef<FormHandles>(null);

  const { selectedFriend } = useFriends();
  const { createEventOwner } = useEventOwners();

  const [loading, setLoading] = useState(false);

  async function handleSubmit({ description }: IFormParams) {
    try {
      setLoading(true);
      await createEventOwner({
        description,
        number_of_guests: 0,
        owner_id: selectedFriend.user_id,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <WindowContainer
      closeWindow={() => {}}
      zIndex={15}
      top="5%"
      left="2%"
      height="90%"
      width="96%"
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Container>
              <WindowHeader overTitle="Novo" title="Anfitrião" />
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  name="description"
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  placeholder="Descrição"
                  returnKeyType="send"
                  placeholderTextColor={theme.color.secondary}
                  onSubmitEditing={() => formRef.current?.submitForm()}
                />
              </Form>
            </Container>
            <Button loading={loading} onPress={() => formRef.current?.submitForm()}>
              Criar
            </Button>
          </FormContainer>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
