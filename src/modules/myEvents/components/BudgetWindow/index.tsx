import React, { useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import WindowContainer from '../../../../components/WindowContainer';
import { useEventInfo } from '../../../../hooks/eventInfo';
import { useMyEvent } from '../../../../hooks/myEvent';
import { Container, Title } from './styles';
import Input from '../../../../components/Input';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import Button from '../../../../components/Button';

interface IFormData {
  budget: number;
}

interface IProps {
  closeWindow: () => void;
}

const BudgetWindow: React.FC<IProps> = ({ closeWindow }) => {
  const formRef = useRef<FormHandles>(null);
  const { eventInfo } = useMyEvent();
  const { editEventInfo, loading } = useEventInfo();

  const handleSubmit = useCallback(async ({ budget }: IFormData) => {
    await editEventInfo({
      ...eventInfo,
      budget,
    });
    closeWindow();
  }, [closeWindow, editEventInfo, eventInfo]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={15}
      top="5%"
      left="2%"
      height="40%"
      width="96%"
    >
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Title>Orçamento do Evento</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="budget"
            icon="dollar-sign"
            placeholder={
              eventInfo
                && eventInfo.budget
                ? formatBrlCurrency(eventInfo.budget)
                : formatBrlCurrency(0)}
            returnKeyType="send"
            keyboardType="number-pad"
            onSubmitEditing={() => formRef.current?.submitForm()}
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

export default BudgetWindow;
