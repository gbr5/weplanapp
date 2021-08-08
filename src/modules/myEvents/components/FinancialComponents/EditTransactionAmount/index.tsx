import React, { useRef, useState, useMemo } from 'react';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../../../utils/getValidationErros';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { useTransaction } from '../../../../../hooks/transactions';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';

import { FormContainer, KeyboardAvoidingVueContainer } from '../../SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import { Container, ValueContainer, CurrentValue, Title } from './styles';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';

interface IFormParams {
  amount: string;
}

export function EditTransactionAmount() {
  const formRef = useRef<FormHandles>(null);

  const { getEventSuppliers } = useMyEvent();
  const {
    handleUpdateAgreementAndTransactions,
  } = useEventSuppliers();
  const {
    selectedEventTransaction,
    editTransaction,
    handleSelectedEventTransaction,
    handleEditEventTransactionValueWindow,
    updateEventSupplierTransactionAgreement,
  } = useTransaction();

  const [loading, setLoading] = useState(false);

  const currentValue = useMemo(() => {
    return formatBrlCurrency(selectedEventTransaction.transaction.amount);
  }, [selectedEventTransaction.transaction.amount]);

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
      const oldEventTransaction = selectedEventTransaction;
      if (selectedEventTransaction.agreement_type === 'none') {
        const response = await editTransaction({
          ...selectedEventTransaction.transaction,
          amount,
        });
        handleSelectedEventTransaction({
          ...oldEventTransaction,
          transaction: response,
        });
      }
      if (selectedEventTransaction.agreement_type === 'supplier') {
        const updatedAgreement = handleUpdateAgreementAndTransactions({
          id: selectedEventTransaction.agreement_id,
          transactions: [
            {
              ...selectedEventTransaction.transaction,
              amount,
            },
          ]
        });
        await updateEventSupplierTransactionAgreement(updatedAgreement);
        await getEventSuppliers(selectedEventTransaction.event_id);
      }
      handleEditEventTransactionValueWindow();
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
      closeWindow={handleEditEventTransactionValueWindow}
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
