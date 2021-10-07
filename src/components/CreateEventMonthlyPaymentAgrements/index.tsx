import React, { useMemo, useRef, useState } from 'react';
import { Keyboard, Platform, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Form } from '@unform/mobile';
import { Alert } from 'react-native';
import { FormHandles } from '@unform/core';

import formatOnlyDateShort from '../../utils/formatOnlyDateShort';
import { useTransaction } from '../../hooks/transactions';

import WindowContainer from '../WindowContainer';
import { WindowHeader } from '../WindowHeader';
import { FormButton } from '../FormButton';
import { MenuBooleanButton } from '../MenuBooleanButton';
import Button from '../Button';

import { useEventVariables } from '../../hooks/eventVariables';
import IMonthlyPaymentParticipantDTO from '../../dtos/IMonthlyPaymentParticipantDTO';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionDTO';
import { addMonths } from 'date-fns';
import { formatBrlCurrency } from '../../utils/formatBrlCurrency';
import { FormContainer, KeyboardAvoidingVueContainer } from '../CreateTransactionAgreement/styles';

import {
  Container,
  Title,
  Icon,
  InputContainer,
  InputField,
  ResumeContainer,
  ResumeTitle,
} from './styles';

export function CreateEventMonthlyPaymentAgrements() {
  const {
    selectedEvent,
    selectedParticipants,
    handleCreateMonthlyPaymentAgreementWindow,
    handleNewEventMonthlyPaymentConfirmation,
    handleNewMonthlyPaymentAgreementVariables,
    selectedDate,
    handleSelectedDateWindow,
    monthlyPayments,
  } = useEventVariables();
  const {
    loading,
    selectNewTransactions,
  } = useTransaction();

  const formRef = useRef<FormHandles>(null);
  const amountRef = useRef<TextInput>(null);
  const installmentsRef = useRef<TextInput>(null);

  const [transactionType, setTransactionType] = useState<'debit' | 'credit'>('credit');
  const [name, setName] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('0');
  const [numberOfInstallments, setNumberOfInstallments] = useState('1');

  function handleTransactionType(data: 'debit' | 'credit') {
    setTransactionType(data);
  }

  function handleNumberOfInstallments(data: string) {
    setNumberOfInstallments(data);
  }

  function handleMonthlyPayment(data: string) {
    if (data === '0') data = '';
    data = data.replace(/\D/g, '');
    data = String(Number(data)).replace(/(\d)(\d{2})$/g, '$1,$2');
    data = data.replace(/(?=(\d{3})+(\D))\B/g, '.');
    setMonthlyPayment(data);
  }

  function handleName(data: string) {
    setName(data);
  }

  const { amount, totalAmount } = useMemo(() => {
    const payment = Number(monthlyPayment.replace(/\D/g, '')) / 100;
    const newAmount = Number(numberOfInstallments) * payment;
    const total = newAmount * selectedParticipants.length;
    return {
      amount: newAmount,
      totalAmount: total,
    };
  }, [numberOfInstallments, monthlyPayment]);

  async function handleSubmit() {
    const payment = Number(monthlyPayment.replace(/\D/g, '')) / 100;
    if (monthlyPayment === '') return Alert.alert('Digite o valor da transação!');
    const participants: IMonthlyPaymentParticipantDTO[] = selectedParticipants.map(({
      participant_id,
      participant_type,
      participant_name,
    }) => {
      const transactions: ICreateTransactionDTO[] = [];

      for (let i = 0; i < Number(numberOfInstallments); i++) {
        transactions.push({
          amount: payment,
          due_date: addMonths(new Date(selectedDate.setHours(10)), i),
          isPaid: false,
          name: `${participant_name} | ${name === '' ? defaultModelName : name}`,
          payee_id: transactionType === 'credit' ? selectedEvent.id : participant_id,
          payer_id: transactionType === 'credit' ? participant_id : selectedEvent.id,
          category: transactionType === 'credit' ? 'Mensalidade' : 'Reembolso',
        });
      }

      selectNewTransactions(transactions);
      return {
        participant_id,
        participant_type,
        transactions,
      };
    });

    handleNewMonthlyPaymentAgreementVariables({
      monthly_payment: payment,
      amount,
      event_id: selectedEvent.id,
      name: name === '' ? defaultModelName : name,
      number_of_installments: Number(numberOfInstallments),
      participants,
      start_date: selectedDate,
    });
    handleCreateMonthlyPaymentAgreementWindow();
    handleNewEventMonthlyPaymentConfirmation();
  }

  function handleDateWindow() {
    Keyboard.dismiss();
    handleSelectedDateWindow();
  }

  const defaultModelName = useMemo(() => {
    return `Mensalidade ${monthlyPayments.transactionAgreements.length}`;
  }, [monthlyPayments.transactionAgreements.length]);

  return (
    <WindowContainer
      closeWindow={handleCreateMonthlyPaymentAgreementWindow}
      zIndex={29}
      top="0%"
      left="0%"
      height="100%"
      width="100%"
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >

        <WindowHeader overTitle="Novo" title="Contrato em Grupo" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <ResumeContainer>
                  <ResumeTitle>Número de participantes: </ResumeTitle>
                  <ResumeTitle>{selectedParticipants.length}</ResumeTitle>
                </ResumeContainer>
                <ResumeContainer>
                  <ResumeTitle>Valor por Contrato: </ResumeTitle>
                  <ResumeTitle>{formatBrlCurrency(amount)}</ResumeTitle>
                </ResumeContainer>
                <ResumeContainer>
                  <ResumeTitle>Valor Total: </ResumeTitle>
                  <ResumeTitle>{formatBrlCurrency(totalAmount)}</ResumeTitle>
                </ResumeContainer>

                <Title>Nome do modelo</Title>
                <InputContainer>
                  <Icon name="tag" />
                  <InputField
                    ref={amountRef}
                    defaultValue={defaultModelName}
                    placeholder={defaultModelName}
                    autoCorrect={false}
                    onChangeText={e => handleName(e)}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      amountRef.current?.focus();
                    }}
                  />
                </InputContainer>
                <Title>Valor da parcela mensal</Title>
                <InputContainer>
                  <Icon name="dollar-sign" />
                  <InputField
                    ref={amountRef}
                    placeholder={formatBrlCurrency(0)}
                    defaultValue={monthlyPayment}
                    onChangeText={e => handleMonthlyPayment(e)}
                    returnKeyType="next"
                    keyboardType="numeric"
                    onSubmitEditing={() => {
                      installmentsRef.current?.focus();
                    }}
                  />
                </InputContainer>
                <Title>Número de parcelas</Title>
                <InputContainer>
                  <Icon name="hash" />
                  <InputField
                    ref={installmentsRef}
                    defaultValue='1'
                    onChangeText={e => handleNumberOfInstallments(e)}
                    returnKeyType="next"
                    keyboardType="numeric"
                    onSubmitEditing={handleDateWindow}
                  />
                </InputContainer>
                {/* <Input
                  ref={installmentsRef}
                  name="number_of_installments"
                  defaultValue='1'
                  onChangeText={handleNumberOfInstallments}
                  icon="hash"
                  returnKeyType="send"
                  keyboardType="numeric"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                /> */}
              </Form>
            </Container>
            <Title>Tipo</Title>
            <ResumeContainer>

              <MenuBooleanButton
                firstActive={transactionType === 'credit'}
                firstFunction={() => handleTransactionType('credit')}
                firstLabel="Mensalidade"
                secondFunction={() => handleTransactionType('debit')}
                secondLabel="Reembolso"
              />

            </ResumeContainer>
            <ResumeContainer><Title>Data da primeira parcela</Title></ResumeContainer>
            <Button onPress={handleDateWindow}>{formatOnlyDateShort(String(selectedDate))}</Button>
          </FormContainer>
        </TouchableWithoutFeedback>
        {amount !== 0 && (
          <FormButton
            loading={loading}
            text="Salvar"
            handleSubmit={() => {formRef.current?.submitForm();}}
          />
        )}
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
