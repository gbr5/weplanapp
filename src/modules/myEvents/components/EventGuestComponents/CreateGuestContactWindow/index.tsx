import React, { useCallback, useState, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Button from '../../../../../components/Button';
import Input from '../../../../../components/Input';

import WindowContainer from '../../../../../components/WindowContainer';
import { useEventGuests } from '../../../../../hooks/eventGuests';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import SelectContactType from '../../SelectContactType';

import { Container, Title } from './styles';

interface IFormData {
  contact_info: string;
}


export function CreateGuestContactWindow(): JSX.Element {
  const formRef = useRef<FormHandles>(null);
  const { selectedEventGuest } = useEventVariables();
  const {
    createGuestContact,
    loading,
    handleCreateGuestContactWindow,
  } = useEventGuests();
  const [contactTypeWindow, setContactTypeWindow] = useState(true);
  const [contact_type, setContactType] = useState('Whatsapp');

  const handleContactTypeWindow = useCallback((e: boolean) => {
    setContactTypeWindow(e);
  }, []);

  const selectContactType = useCallback((e: string) => {
    setContactType(e);
  }, []);

  const handleSubmit = useCallback(async ({ contact_info }: IFormData) => {
    await createGuestContact({
      contact_info,
      contact_type,
      guest_id: selectedEventGuest.id,
    });
    handleCreateGuestContactWindow();
  }, [
    createGuestContact,
    handleCreateGuestContactWindow,
    contact_type,
    selectedEventGuest,
  ]);

  return (
    <>
      {contactTypeWindow && (
        <SelectContactType
          closeWindow={() => handleContactTypeWindow(false)}
          selectContactType={(e: string) => selectContactType(e)}
          selectedContactType={contact_type}
        />
      )}
      <WindowContainer
        closeWindow={handleCreateGuestContactWindow}
        height="70%"
        left="2%"
        top="10%"
        width="96%"
        zIndex={15}
      >
        <Container>
          <Title>Novo Contato</Title>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              icon="info"
              placeholder="contato"
              name="contact_info"
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
    </>
  );
}
