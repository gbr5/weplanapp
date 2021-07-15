import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Input from '../../../../../components/Input';
import WindowContainer from '../../../../../components/WindowContainer';

import { Container, FormQuestion, Title } from './styles';
import Button from '../../../../../components/Button';
import { useEventGuests } from '../../../../../hooks/eventGuests';

interface IFormData {
  contact_info: string;
}

interface IProps {
  closeWindow: () => void;
}

const EditGuestContact: React.FC<IProps> = ({ closeWindow }) => {
  const formRef = useRef<FormHandles>(null);
  const {
    updateGuestContact,
    loading,
    selectedGuestContact,
  } = useEventGuests();

  const handleSubmit = useCallback(async ({ contact_info }: IFormData) => {
    await updateGuestContact({
      ...selectedGuestContact,
      contact_info,
    });
    closeWindow();
  }, [updateGuestContact, closeWindow, selectedGuestContact]);

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
          <Title>Editar Contato</Title>
          <FormQuestion>
            {
              selectedGuestContact.contact_type
            }
          </FormQuestion>
          <Input
            name="contact_info"
            autoCorrect={false}
            autoCapitalize="sentences"
            icon="list"
            placeholder={
              selectedGuestContact.contact_info !== ' '
                ? selectedGuestContact.contact_info
                : 'contato'
              }
            defaultValue={selectedGuestContact.contact_info}
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
        </Form>
      </Container>
      <Button
        loading={loading}
        onPress={() => formRef.current?.submitForm()}
      >
        Salvar
      </Button>
    </WindowContainer>
  );
};

export default EditGuestContact;
