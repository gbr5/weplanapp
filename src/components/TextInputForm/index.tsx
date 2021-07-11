import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React from 'react';
import { useRef } from 'react';
import Input from '../Input';
import WindowContainer from '../WindowContainer';

import {
  Container,
  Title,
  ButtonContainer,
  Button,
  ButtonText,
} from './styles';

interface IFormParams {
  name: string;
}

interface IProps {
  closeWindow: () => void;
  onHandleSubmit: (e: string) => void;
  placeholder: string;
  title: string;
}

export function TextInputForm({
  closeWindow,
  onHandleSubmit,
  placeholder,
  title,
}: IProps): JSX.Element {
  const formRef = useRef<FormHandles>(null);

  function handleSubmit({ name }: IFormParams) {
    if (name !== '') {
      onHandleSubmit(name);
    }
    closeWindow();
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      top="20%"
      width="100%"
      left="0%"
      height="40%"
      zIndex={20}
    >
      <Container>
        <Title>{title}</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            autoCapitalize="words"
            placeholder={placeholder}
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

          <ButtonContainer>
            <Button
              onPress={closeWindow}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
              onPress={() => formRef.current?.submitForm()}
            >
              <ButtonText>Salvar</ButtonText>
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </WindowContainer>
  );
};
