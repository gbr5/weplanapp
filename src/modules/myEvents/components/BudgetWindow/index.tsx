import React, { useRef } from 'react';
import { Alert, Platform } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import WindowContainer from '../../../../components/WindowContainer';
import { useMyEvent } from '../../../../hooks/myEvent';
import { Container, Title } from './styles';
import Input from '../../../../components/Input';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';
import Button from '../../../../components/Button';
import theme from '../../../../global/styles/theme';
import { WindowHeader } from '../../../../components/WindowHeader';

interface IFormData {
  budget: number;
}

export function BudgetWindow() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.buttonShadow;
  const formRef = useRef<FormHandles>(null);
  const {
    eventBudget,
    loading,
    createEventBudget,
    updateEventBudget,
    handleBudgetWindow,
  } = useMyEvent();

  async function handleSubmit({ budget }: IFormData) {
    if (eventBudget && !eventBudget.id) {
      await createEventBudget(budget);
    } else {
      await updateEventBudget({
        ...eventBudget,
        budget,
      });
    }
    handleBudgetWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleBudgetWindow}
      zIndex={15}
      top="10%"
      left="2%"
      height="70%"
      width="96%"
    >
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <WindowHeader title="Orçamento do Evento" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            placeholderTextColor={theme.color.secondary}
            name="budget"
            icon="dollar-sign"
            placeholder={
              eventBudget
                && eventBudget.budget
                  ? formatBrlCurrency(eventBudget.budget)
                  : formatBrlCurrency(0)}
            returnKeyType="send"
            keyboardType="number-pad"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
      </Container>
      <Button
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: 15,
        }}
        loading={loading}
        onPress={() => formRef.current?.submitForm()}
      >
        Salvar
      </Button>
    </WindowContainer>
  );
};
