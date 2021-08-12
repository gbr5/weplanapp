import React, { useRef } from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Form } from '@unform/mobile';

import { useTransaction } from '../../../hooks/transactions';

import WindowContainer from '../../WindowContainer';
import { FormContainer, KeyboardAvoidingVueContainer } from '../../../modules/myEvents/components/SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import { WindowHeader } from '../../WindowHeader';
import Input from '../../Input';

import { FormHandles } from '@unform/core';
import theme from '../../../global/styles/theme';
import { FormButton } from '../../FormButton';

import { Container, Title } from './styles';
import ICreateTransactionDTO from '../../../dtos/ICreateTransactionDTO';
import { Alert } from 'react-native';

interface IFormParams {
  amount: string;
}

export function EditNewTransactionAmount() {
  const {
    handleNewAgreement,
    newAgreementInstallments,
    handleEditNewTransactionValueWindow,
    newTransactions,
    selectNewTransactions,
    selectedNewTransaction,
    handleSelectedNewTransaction
  } = useTransaction();
  const formRef = useRef<FormHandles>(null);

  function handleSubmit({ amount }: IFormParams) {
    if (amount === '') return Alert.alert('Digite o valor da transação!');
    const transactions = newTransactions.map(item => {
      if (item === selectedNewTransaction) {
        return {
          ...item,
          amount: Number(amount),
        };
      }
      return item;
    });
    selectNewTransactions(transactions);
    const totalAmount = transactions.map(item => item.amount).reduce((acc, cv) => acc + cv, 0);
    handleNewAgreement({
      amount: totalAmount,
      installments: newAgreementInstallments,
    });
    handleSelectedNewTransaction({} as ICreateTransactionDTO);
    handleEditNewTransactionValueWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleEditNewTransactionValueWindow}
      zIndex={31}
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
        <WindowHeader overTitle="Novo Contrato" title="Editar Transação" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Title>Valor da Transação</Title>
                <Input
                  name="amount"
                  keyboardType="numeric"
                  placeholderTextColor={theme.color.secondary}
                  autoCorrect={false}
                  autoCapitalize="none"
                  icon="dollar-sign"
                  returnKeyType="next"
                  placeholder={String(selectedNewTransaction.amount)}
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
              </Form>
            </Container>
          </FormContainer>
        </TouchableWithoutFeedback>
        <FormButton
          text="Salvar"
          handleSubmit={() => {formRef.current?.submitForm();}}
        />
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
