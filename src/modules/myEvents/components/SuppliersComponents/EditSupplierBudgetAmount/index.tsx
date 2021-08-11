import React, { useRef, useState, useMemo } from 'react';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../../utils/getValidationErros';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';


import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';

import { FormContainer, KeyboardAvoidingVueContainer } from '../../SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import { Container, ValueContainer, CurrentValue, Title } from './styles';

interface IFormParams {
  amount: string;
}

export function EditSupplierBudgetAmount() {
  const formRef = useRef<FormHandles>(null);
  const {
    updateSupplierBudget,
    selectedSupplierBudget,
    handleEditSupplierBudgetAmountWindow,
  } = useEventSuppliers();

  const [loading, setLoading] = useState(false);

  const currentValue = useMemo(() => {
    return formatBrlCurrency(selectedSupplierBudget.amount);
  }, [selectedSupplierBudget.amount]);

  async function handleSubmit(data: IFormParams) {
    try {
      setLoading(true);

      if (!Number(data.amount)) {
        return Alert.alert('Valor da Transação', 'Apenas números são aceitos!');
      }
      if (Number(data.amount) <= 0) {
        return Alert.alert('Valor da Transação', 'Apenas valores maiores do que zero são aceitos!');
      }
      const amount = Number(data.amount);
      await updateSupplierBudget({
        ...selectedSupplierBudget,
        amount,
      });
      handleEditSupplierBudgetAmountWindow();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

      formRef.current?.setErrors(error);
      }
      return Alert.alert('Erro na atualização', 'Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <WindowContainer
      closeWindow={handleEditSupplierBudgetAmountWindow}
      zIndex={25}
      top="5%"
      left="0%"
      height="70%"
      width="100%"
    >
      <Container>
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
              <WindowHeader title="Editar Valor" />
              <Form ref={formRef} onSubmit={handleSubmit}>
                <ValueContainer>
                  <Title>Valor Atual</Title>
                  <CurrentValue>{currentValue}</CurrentValue>
                </ValueContainer>
                <Input
                  name="amount"
                  icon="dollar-sign"
                  returnKeyType="send"
                  keyboardType="numeric"
                  onSubmitEditing={() => formRef.current?.submitForm()}
                />
              </Form>
          </FormContainer>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingVueContainer>
      </Container>
      <Button
        loading={loading}
        onPress={() => formRef.current?.submitForm()}
      >
        Salvar
      </Button>
    </WindowContainer>
  );
}
