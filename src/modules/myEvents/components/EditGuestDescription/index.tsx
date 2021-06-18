import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { TextInput } from 'react-native';
import Input from '../../../../components/Input';
import { useMyEvent } from '../../../../hooks/myEvent';
import WindowContainer from '../../../../components/WindowContainer';

import { Container, FormQuestion, Title } from './styles';
import Button from '../../../../components/Button';

interface IFormData {
  description: string;
}

interface IProps {
  closeWindow: () => void;
}

const EditGuestName: React.FC<IProps> = ({ closeWindow }) => {
  const formRef = useRef<FormHandles>(null);
  const inputRef = useRef<TextInput>(null);
  const { editGuest, selectedGuest } = useMyEvent();

  const handleSubmit = useCallback(async ({ description }: IFormData) => {
    await editGuest({
      ...selectedGuest,
      description,
    });
    closeWindow();
  }, [editGuest, closeWindow, selectedGuest]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      height="80%"
      left="2%"
      top="10%"
      width="96%"
      zIndex={11}
    >
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Title>Editar Convidado(a)</Title>
          <FormQuestion>Descrição</FormQuestion>
          <Input
            name="description"
            autoCorrect={false}
            autoCapitalize="sentences"
            icon="list"
            placeholder={selectedGuest.description !== ' ' ? selectedGuest.description : 'Descrição'}
            defaultValue={selectedGuest.description}
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
        </Form>
      </Container>
      <Button
        onPress={() => formRef.current?.submitForm()}
      >
        Salvar
      </Button>
    </WindowContainer>
  );
};

export default EditGuestName;
