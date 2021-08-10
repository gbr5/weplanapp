import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { addDays, addMonths } from 'date-fns';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import theme from '../../../../../global/styles/theme';
import getValidationErrors from '../../../../../utils/getValidationErros';
import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';

import { WindowHeader } from '../../../../../components/WindowHeader';
import WindowContainer from '../../../../../components/WindowContainer';
import Button from '../../../../../components/Button';
import Input, { InputRefProps } from '../../../../../components/Input';

import {
  Container,
  SupplierContainer,
  SupplierName,
  KeyboardAvoidingVueContainer,
  FormContainer,
  Question,
  SupplierText,
} from './styles';
import ICreateTransactionDTO from '../../../../../dtos/ICreateTransactionDTO';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

interface IFormData {
  amount: string;
  number_of_installments: string;
}

export function CreateSupplierTransactionAgreement() {
  const formRef = useRef<FormHandles>(null);
  const numberRef = useRef<InputRefProps>(null);
  const {
    selectedSupplier,
    loading,
    selectSupplier,
    selectedEvent,
  } = useMyEvent();
  const {
    handleCreateSupplierTransactionAgreementWindow,
  } = useEventSuppliers();
  const {
    handleNewAgreement,
    selectNewTransactions,
    handleSelectedDate,
    selectedDate,
    handleSelectedDateWindow,
    handleNewEventSupplierTransactionAgreement,
  } = useTransaction();

  function closeWindow() {
    handleNewAgreement({
      amount: 0,
      installments: 1,
    });
    selectNewTransactions([]);
    selectSupplier({} as IEventSupplierDTO);
    handleCreateSupplierTransactionAgreementWindow();
    handleSelectedDate(addDays(new Date(), 3));
  }

  const handleSubmit = useCallback(async ({
    amount,
    number_of_installments,
  }: IFormData) => {
    try {
      formRef.current?.setErrors({});

      if (!Number(amount)) {
        return Alert.alert('Valor do Contrato', 'Apenas números são aceitos!');
      }

      if (!Number(number_of_installments)) {
        return Alert.alert('Número de Parcelas', 'Apenas números são aceitos!');
      }

      if (!selectedSupplier || !selectedSupplier.id) {
        return Alert.alert('Escolha um fornecedor!');
      }

      const data = {
        amount: Number(amount),
        number_of_installments: Number(number_of_installments),
      }

      const schema = Yup.object().shape({
        amount: Yup.number().required('Apenas números'),
        number_of_installments: Yup.number().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      handleNewAgreement({
        amount: data.amount,
        installments: data.number_of_installments,
      });
      const transactions: ICreateTransactionDTO[] = [];
      let i = 0;
      for (i; i < data.number_of_installments; i++) {
        transactions.push({
          name: '',
          amount: data.amount/data.number_of_installments,
          category: selectedSupplier.supplier_sub_category,
          due_date: addMonths(new Date(selectedDate.setHours(10)), i),
          isPaid: false,
          payee_id: selectedSupplier.id,
          payer_id: selectedEvent.id,
        });
      }
      selectNewTransactions(transactions);

      handleCreateSupplierTransactionAgreementWindow();
      handleNewEventSupplierTransactionAgreement();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

      formRef.current?.setErrors(error);
      }
      return Alert.alert('Erro ao criar contrato', 'Tente novamente!');
    }
  }, []);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={15}
      top="5%"
      left="2%"
      height="92%"
      width="96%"
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <WindowHeader title="Novo Contrato" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Container>
              <SupplierContainer>
                <SupplierText>Fornecedor: </SupplierText>
                <SupplierName>{selectedSupplier.name}</SupplierName>
              </SupplierContainer>

              <Form ref={formRef} onSubmit={handleSubmit}>
                <Question>Valor do Contrato</Question>
                <Input
                  name="amount"
                  keyboardType="numeric"
                  placeholderTextColor={theme.color.secondary}
                  autoCorrect={false}
                  autoCapitalize="none"
                  icon="dollar-sign"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    numberRef.current?.focus();
                  }}
                />

                <Question>Número de Parcelas</Question>
                <Input
                  defaultValue="1"
                  name="number_of_installments"
                  ref={numberRef}
                  placeholderTextColor={theme.color.secondary}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  icon="hash"
                  returnKeyType="send"
                  onSubmitEditing={() => formRef.current?.submitForm()}
                />

                <Question>Data da primeira parcela</Question>

                <Button
                  onPress={handleSelectedDateWindow}
                >
                  {formatOnlyDateShort(String(selectedDate))}
                </Button>
              </Form>
            </Container>
          </FormContainer>
        </TouchableWithoutFeedback>
        <Button
          loading={loading}
          onPress={() => formRef.current?.submitForm()}
        >
          Próximo
        </Button>
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
