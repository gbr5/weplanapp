import React, { useRef } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TouchableWithoutFeedback, Keyboard, Platform, TextInput } from 'react-native';

import theme from '../../../../../global/styles/theme';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useTransaction } from '../../../../../hooks/transactions';
import { useEventVariables } from '../../../../../hooks/eventVariables';

import formatOnlyDate from '../../../../../utils/formatOnlyDate';

import WindowContainer from '../../../../../components/WindowContainer';
import Input from '../../../../../components/Input';
import { FormButton } from '../../../../../components/FormButton';
import { WindowHeader } from '../../../../../components/WindowHeader';

import { FormContainer, KeyboardAvoidingVueContainer } from '../../SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import {
  Container,
  FormQuestion,
  DateContainer,
  DateText,
  DateButton,
} from './styles';

interface IFormData {
  amount: string;
  description: string;
}

export function EventSupplierBudgetForm() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { selectedEventSupplier } = useEventVariables();
  const {
    handleSupplierBudgetForm,
    createSupplierBudget,
    loading,
  } = useEventSuppliers();
  const {
    selectedDate,
    handleSelectedDateWindow,
  } = useTransaction();
  const formRef = useRef<FormHandles>(null);
  const descriptionRef = useRef<TextInput>(null);

  async function handleSubmit({
    amount,
    description,
  }: IFormData) {
    await createSupplierBudget({
      amount: Number(amount),
      description,
      due_date: selectedDate,
      isActive: true,
      supplier_id: selectedEventSupplier.id,
    });
    formRef.current?.clearField;
    handleSupplierBudgetForm();
  }

  return (
    <WindowContainer
      closeWindow={handleSupplierBudgetForm}
      top="5%"
      left="2%"
      height="85%"
      width="96%"
      zIndex={19}
      backdropZIndex={14}
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <WindowHeader title="Novo Orçamento" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <FormQuestion>Valor</FormQuestion>
                <Input
                  name="amount"
                  icon="dollar-sign"
                  returnKeyType="send"
                  keyboardType="numeric"
                  onSubmitEditing={() => {
                    descriptionRef.current?.focus();
                  }}
                />
                <FormQuestion>Descrição (Opcional)</FormQuestion>
                <Input
                  ref={descriptionRef}
                  placeholderTextColor={theme.color.secondary}
                  name="description"
                  autoCorrect={false}
                  autoCapitalize="words"
                  placeholder="Descrição"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
              </Form>
              <FormQuestion>Data de Vencimento</FormQuestion>
              <DateContainer>
                <DateButton
                  style={{
                    shadowColor,
                    shadowOffset,
                    shadowOpacity,
                    shadowRadius,
                  }}
                  onPress={handleSelectedDateWindow}
                >
                  <DateText>{formatOnlyDate(String(selectedDate))}</DateText>
                </DateButton>
              </DateContainer>
            </Container>
          </FormContainer>
        </TouchableWithoutFeedback>
        <FormButton
          loading={loading}
          handleSubmit={() => formRef.current?.submitForm()}
          text="Salvar"
        />
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
};
