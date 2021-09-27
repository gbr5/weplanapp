import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import ICreateEventInfoDTO from '../../../../dtos/ICreateEventInfoDTO';
import theme from '../../../../global/styles/theme';
import { useEventInfo } from '../../../../hooks/eventInfo';
import { useMyEvent } from '../../../../hooks/myEvent';
import { useEventVariables } from '../../../../hooks/eventVariables';

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import WindowContainer from '../../../../components/WindowContainer';

import { Container, Title } from './styles';

interface IProps {
  closeWindow: () => void;
}

const CreateEventInfoWindow: React.FC<IProps> = ({ closeWindow }) => {
  const formRef = useRef<FormHandles>(null);
  const { getEvent } = useMyEvent();
  const { selectedEvent } = useEventVariables();
  const { createEventInfo, loading } = useEventInfo();

  const handleSubmit = useCallback(async (data: ICreateEventInfoDTO) => {
    await createEventInfo(data);
    await getEvent(selectedEvent.id);
    closeWindow();
  }, [getEvent, selectedEvent, closeWindow, createEventInfo]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={15}
      top="5%"
      left="2%"
      height="90%"
      width="96%"
    >
      <Container>
        <Title>Informações do Evento</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            placeholderTextColor={theme.color.secondary}
            name="budget"
            icon="dollar-sign"
            returnKeyType="next"
            keyboardType="number-pad"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
          <Input
            placeholderTextColor={theme.color.secondary}
            name="budget"
            icon="dollar-sign"
            returnKeyType="next"
            keyboardType="number-pad"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
      </Container>
      <Button
        loading={loading}
        onPress={() => formRef.current?.submitForm()}
      >
        Criar
      </Button>
    </WindowContainer>
  );
};

export default CreateEventInfoWindow;
