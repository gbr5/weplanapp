import React, { useState, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Alert } from 'react-native';

import { Form } from '@unform/mobile';

import { useTransaction } from '../../../../../hooks/transactions';

import Input from '../../../../../components/Input';

import {
  Container,
  Title,
  IsPaidSection,
  IsPaidButton,
  IsPaidIcon,
  DateButton,
  DateText,
} from './styles';
import Button from '../../../../../components/Button';
import formatOnlyDate from '../../../../../utils/formatOnlyDate';
import theme from '../../../../../global/styles/theme';
import { useEventVariables } from '../../../../../hooks/eventVariables';

interface IFormData {
  amount: string;
}

export function EventSupplierTransactionForm() {
  const formRef = useRef<FormHandles>(null);

  const { selectedEvent, selectedEventSupplier } = useEventVariables();
  const {
    handleSelectedDateWindow,
    selectedDate,
    newTransactions,
    selectNewTransactions
  } = useTransaction();

  const [isPaid, setIsPaid] = useState(false);

  function handleIsPaid() {
    setIsPaid(!isPaid);
  }

  const handleSubmit = useCallback(({ amount }: IFormData) => {
    if (!Number(amount)) {
      return Alert.alert('Valor da Parcela', 'Apenas números são aceitos!');
    }
    selectNewTransactions([
      ...newTransactions,
      {
        name: '',
        amount: Number(amount),
        due_date: new Date(selectedDate.setHours(10)),
        isPaid,
        payee_id: selectedEventSupplier.id,
        payer_id: selectedEvent.id,
        index: String(newTransactions.length) + 1,
      },
    ]);
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} >
        <Title>Valor da Parcela</Title>
        <Input
          name="amount"
          placeholderTextColor={theme.color.secondary}
          keyboardType="number-pad"
          autoCorrect={false}
          autoCapitalize="none"
          icon="dollar-sign"
          returnKeyType="next"
        />
        <IsPaidSection>
          <IsPaidButton
            isPaid={isPaid}
            onPress={handleIsPaid}
          >
            <Title>
              {isPaid ? 'Pago' : 'Não Pago'}
            </Title>
            {isPaid ? (
              <IsPaidIcon name="check-square" />
            ) : (
              <IsPaidIcon name="square" />
            )}
          </IsPaidButton>
        </IsPaidSection>
        <Title>Data do pagamento</Title>
        <DateButton
          onPress={handleSelectedDateWindow}
        >
          <DateText>{formatOnlyDate(String(selectedDate))}</DateText>
        </DateButton>
      </Form>
      <Button
        onPress={() => formRef.current?.submitForm()}
      >
        Salvar
      </Button>
    </Container>
  );
}
