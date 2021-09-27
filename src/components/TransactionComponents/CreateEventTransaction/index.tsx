import React, { useRef, useState } from 'react';
import { Keyboard, Platform, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Form } from '@unform/mobile';
import { Alert } from 'react-native';
import { FormHandles } from '@unform/core';

import theme from '../../../global/styles/theme';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';
import { useTransaction } from '../../../hooks/transactions';

import WindowContainer from '../../WindowContainer';
import { FormContainer, KeyboardAvoidingVueContainer } from '../../../modules/myEvents/components/SuppliersComponents/CreateSupplierTransactionAgreement/styles';
import { WindowHeader } from '../../WindowHeader';
import Input from '../../Input';
import { FormButton } from '../../FormButton';
import { MenuBooleanButton } from '../../MenuBooleanButton';
import Button from '../../Button';

import { Container, Title } from './styles';
import { useEventVariables } from '../../../hooks/eventVariables';

interface IFormParams {
  name: string;
  amount: string;
  category?: string;
}

export function CreateEventTransaction() {
  const noUserMemberUUID = '89890569-ed93-4bf3-b123-91813838aade';

  const { selectedEvent } = useEventVariables();
  const {
    loading,
    handleCreateTransactionWindow,
    createTransaction,
    handleSelectedDateWindow,
    selectedDate,
    handleSelectedDate,
  } = useTransaction();
  const formRef = useRef<FormHandles>(null);
  const amountRef = useRef<TextInput>(null);
  const categoryRef = useRef<TextInput>(null);

  const [isPaid, setIsPaid] = useState(false);
  const [transactionType, setTransactionType] = useState('debit');

  function handleTransactionType(data: string) {
    setTransactionType(data);
  }

  function handleIsPaid(data: boolean) {
    setIsPaid(data);
  }

  async function handleSubmit({
    name,
    amount,
    category,
  }: IFormParams) {
    if (name === '') return Alert.alert('Digite o nome da transação!');
    if (amount === '') return Alert.alert('Digite o valor da transação!');
    await createTransaction({
      amount: Number(amount),
      due_date: selectedDate,
      isPaid,
      name,
      payee_id: transactionType === 'credit' ? selectedEvent.id : noUserMemberUUID,
      payer_id: transactionType === 'debit' ? selectedEvent.id : noUserMemberUUID,
      category,
    });
    handleCreateTransactionWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleCreateTransactionWindow}
      zIndex={21}
      top="5%"
      left="2%"
      height="95%"
      width="96%"
    >
      <KeyboardAvoidingVueContainer
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <WindowHeader title="Editar Transação" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormContainer>
            <Container>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Title>Nome</Title>
                <Input
                  name="name"
                  placeholderTextColor={theme.color.secondary}
                  autoCorrect={false}
                  autoCapitalize="words"
                  icon="info"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    amountRef.current?.focus();
                  }}
                />
                <Title>Valor</Title>
                <Input
                  ref={amountRef}
                  name="amount"
                  icon="dollar-sign"
                  returnKeyType="send"
                  keyboardType="numeric"
                  onSubmitEditing={() => {
                    categoryRef.current?.focus();
                  }}
                />
                <Title>Categoria (Opcional)</Title>
                <Input
                  ref={categoryRef}
                  name="category"
                  placeholderTextColor={theme.color.secondary}
                  autoCorrect={false}
                  autoCapitalize="words"
                  icon="info"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
              </Form>
            </Container>
            <Title>Tipo</Title>

            <MenuBooleanButton
              firstActive={transactionType === 'credit'}
              firstFunction={() => handleTransactionType('credit')}
              firstLabel="Entrada"
              secondFunction={() => handleTransactionType('debit')}
              secondLabel="Saída"
            />
            <Title>Status</Title>
            <MenuBooleanButton
              firstActive={!isPaid}
              firstFunction={() => handleIsPaid(false)}
              firstLabel="A Pagar"
              secondFunction={() => handleIsPaid(true)}
              secondLabel="Pago"
            />
            <Title>Data</Title>
            <Button onPress={handleSelectedDateWindow}>{formatOnlyDateShort(String(selectedDate))}</Button>
          </FormContainer>
        </TouchableWithoutFeedback>
        <FormButton
          loading={loading}
          text="Salvar"
          handleSubmit={() => {formRef.current?.submitForm();}}
        />
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
