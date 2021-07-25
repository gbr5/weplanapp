import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { addDays } from 'date-fns';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import getValidationErrors from '../../../../../utils/getValidationErros';

import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';

import WindowContainer from '../../../../../components/WindowContainer';
import Button from '../../../../../components/Button';
import Input, { InputRefProps } from '../../../../../components/Input';

import {
  Container,
  Title,
  SupplierContainer,
  SupplierName,
  KeyboardAvoidingVueContainer,
  FormContainer,
  Question,
  Underline,
  SupplierText,
} from './styles';
import theme from '../../../../../global/styles/theme';

interface IFormData {
  amount: string;
  number_of_installments: string;
}

export function CreateSupplierTransactionAgreement() {
  const formRef = useRef<FormHandles>(null);
  const numberRef = useRef<InputRefProps>(null);
  const { selectedSupplier, loading, selectSupplier } = useMyEvent();
  const {
    handleCreateSupplierTransactionAgreementWindow,
    handleCreateSupplierTransactionsWindow,
  } = useEventSuppliers();
  const { handleNewAgreement, selectNewTransactions, handleSelectedDate } = useTransaction();

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
      handleCreateSupplierTransactionAgreementWindow();
      handleCreateSupplierTransactionsWindow();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

      formRef.current?.setErrors(error);
      }
      return Alert.alert('Erro na autenticação', 'Tente novamente!');
    }
  }, []);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={15}
      top="5%"
      left="2%"
      height="75%"
      width="96%"
    >
      <Container>
        <Title>Novo Contrato</Title>
        <Underline />
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
            </Form>
          </FormContainer>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingVueContainer>
      </Container>
      <Button
        loading={loading}
        onPress={() => formRef.current?.submitForm()}
      >
        Próximo
      </Button>
    </WindowContainer>
  );
}
