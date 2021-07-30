import React, { useRef, useState, useMemo } from 'react';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../../utils/getValidationErros';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useTransaction } from '../../../../../hooks/transactions';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';

import { FormContainer, KeyboardAvoidingVueContainer } from '../CreateSupplierTransactionAgreement/styles';
import { Container, ValueContainer, CurrentValue, Title } from './styles';

interface IFormParams {
  amount: string;
}

export function EditTransactionValue() {
  const formRef = useRef<FormHandles>(null);

  const {
    selectedSupplierTransactionAgreement,
    handleEditTransactionValueWindow
  } = useEventSuppliers();
  const {
    selectedTransaction,
    selectTransaction,
    updateEventSupplierTransactionAgreement,
  } = useTransaction();

  const [loading, setLoading] = useState(false);

  const currentValue = useMemo(() => {
    return formatBrlCurrency(selectedTransaction.amount);
  }, [selectedTransaction.amount]);

  async function handleSubmit(data: IFormParams) {
    try {
      setLoading(true);

      if (!Number(data.amount)) {
        return Alert.alert('Valor da Transação', 'Apenas números são aceitos!');
      }
      if (Number(data.amount) <= 0) {
        return Alert.alert('Valor da Transação', 'Apenas valores maiores do que zero são aceitos!');
      }
      if (!selectedSupplierTransactionAgreement || !selectedSupplierTransactionAgreement.id) {
        return Alert.alert('Escolha um contrato!');
      }
      if (!selectedTransaction || !selectedTransaction.id) {
        return Alert.alert('Escolha uma transação!');
      }
      const agreementAmount = formatBrlCurrency(selectedSupplierTransactionAgreement.amount);
      const amount = Number(data.amount);
      const newValue = formatBrlCurrency(amount);
      const differenceInValue = amount - Number(selectedTransaction.amount);
      const agreementNewValue = Number(selectedSupplierTransactionAgreement.amount) + differenceInValue;
      const agreementNewAmount = formatBrlCurrency(agreementNewValue);
      const message =
        `
Diferença de ${formatBrlCurrency(differenceInValue)}!

A transação foi atualizada de ${currentValue} para ${newValue}

O contrato foi atualizado de ${agreementAmount} para ${agreementNewAmount}
        `;

      const number_of_installments = selectedSupplierTransactionAgreement.transactions
        .filter(transaction => !transaction.transaction.isCancelled && transaction.transaction.amount !== 0)
        .length;

      const transactions = [{
        ...selectedTransaction,
        amount,
      }];

      selectTransaction(transactions[0]);
      const {
        id,
      } = selectedSupplierTransactionAgreement;
      await updateEventSupplierTransactionAgreement({
        amount: agreementNewValue,
        id,
        isCancelled: agreementNewValue === 0,
        number_of_installments,
        transactions,
      });

      Alert.alert(`Transação atualizada com sucesso!`, message);
      handleEditTransactionValueWindow();
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
      closeWindow={handleEditTransactionValueWindow}
      zIndex={45}
      top="5%"
      left="2%"
      height="50%"
      width="96%"
    >
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
            <Container>
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
            </Container>
            <Button
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
            >
              Salvar
            </Button>
          </FormContainer>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
