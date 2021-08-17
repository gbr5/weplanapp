import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React from 'react';
import { useRef } from 'react';
import theme from '../../global/styles/theme';
import Input from '../Input';
import WindowContainer from '../WindowContainer';

import {
  Container,
  Title,
  ButtonContainer,
  Button,
  CancelButton,
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
    if (name === '') return closeWindow();
    onHandleSubmit(name);
    closeWindow();
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      top="20%"
      width="100%"
      left="0%"
      height="60%"
      zIndex={20}
    >
      <Container>
        <Title>{title}</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            placeholderTextColor={theme.color.secondary}
            name="name"
            autoCapitalize="words"
            placeholder={placeholder}
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

          <ButtonContainer>
            <CancelButton
              onPress={closeWindow}
            >
              <ButtonText>Cancelar</ButtonText>
            </CancelButton>
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
