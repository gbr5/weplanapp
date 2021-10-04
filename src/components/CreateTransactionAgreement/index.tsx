import React, { useCallback, useMemo, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Alert, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { addDays, addMonths } from 'date-fns';

import { useTransaction } from '../../hooks/transactions';

import theme from '../../global/styles/theme';
import getValidationErrors from '../../utils/getValidationErros';

import { WindowHeader } from '../../components/WindowHeader';
import WindowContainer from '../../components/WindowContainer';
import Button from '../../components/Button';
import Input, { InputRefProps } from '../../components/Input';
import ICreateTransactionDTO from '../../dtos/ICreateTransactionDTO';
import formatOnlyDateShort from '../../utils/formatOnlyDateShort';

import {
  Container,
  SupplierContainer,
  SupplierName,
  KeyboardAvoidingVueContainer,
  FormContainer,
  Question,
  SupplierText,
  Participant,
  ParticipantButton,
  Underline,
} from './styles';

interface IFormData {
  amount: string;
  number_of_installments: string;
}
interface ITransactionParticipant {
  name: string;
  id: string;
}

interface IProps {
  closeWindow: () => void;
  nextWindow: () => void;
}

export function CreateTransactionAgreement({
  closeWindow,
  nextWindow,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const formRef = useRef<FormHandles>(null);
  const amountRef = useRef<InputRefProps>(null);
  const numberRef = useRef<InputRefProps>(null);
  const {
    handleNewAgreement,
    selectNewTransactions,
    handleSelectedDate,
    selectedDate,
    handleSelectedDateWindow,
    payer,
    payee,
    handlePayer,
    handlePayee,
  } = useTransaction();

  const [lastField, setLastField] = useState(false);

  function handleCloseWindow() {
    handleNewAgreement({
      amount: 0,
      installments: 1,
    });
    selectNewTransactions([]);
    handleSelectedDate(addDays(new Date(), 3));
    closeWindow();
  }

  function switchParticipants() {
    handlePayee(payer);
    handlePayer(payee);
  }

  const handleSubmit = useCallback(async ({
    amount,
    number_of_installments,
  }: IFormData) => {
    Keyboard.dismiss();
    try {
      formRef.current?.setErrors({});

      if (!Number(amount)) {
        return Alert.alert('Valor do Contrato', 'Apenas números são aceitos!');
      }

      if (!Number(number_of_installments)) {
        return Alert.alert('Número de Parcelas', 'Apenas números são aceitos!');
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
          category: '', // Criar componente como o do split wise
          due_date: addMonths(new Date(selectedDate.setHours(10)), i),
          isPaid: false,
          payee_id: payee.id,
          payer_id: payer.id,
        });
      }
      selectNewTransactions(transactions);
      setLastField(false);
      nextWindow();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }
      return Alert.alert('Erro ao criar contrato', 'Tente novamente!');
    }
  }, []);

  function goToLastField() {
    setLastField(true);
    Keyboard.dismiss();
    numberRef.current?.focus();
  }

  function dismissKeyBoard() {
    setLastField(true);
    Keyboard.dismiss();
  }

  function handleDateWindow() {
    dismissKeyBoard();
    handleSelectedDateWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleCloseWindow}
      zIndex={17}
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
        <TouchableWithoutFeedback onPress={dismissKeyBoard}>
          <FormContainer
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <Container>

              <ParticipantButton
                style={{
                  shadowColor,
                  shadowOffset,
                  shadowOpacity,
                  shadowRadius,
                  elevation: 5,
                }}
                onPress={switchParticipants}
              >
                <SupplierName>Iverter Usuários</SupplierName>
              </ParticipantButton>
              <SupplierContainer>
                <Underline />
                <Participant>
                  {/* Pensar em como fazer payee # payer dinamicos */}
                  {/* Pensar se vale a pena encrementar transaction participants */}
                  <SupplierText>Pagador: </SupplierText>
                  <SupplierName>{payer.name}</SupplierName>
                </Participant>
                <Underline />
                <Participant>
                  {/* Pensar em como fazer payee # payer dinamicos */}
                  {/* Pensar se vale a pena encrementar transaction participants */}
                  <SupplierText>Beneficiário: </SupplierText>
                  <SupplierName>{payee.name}</SupplierName>
                </Participant>
                <Underline />
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
                  onSubmitEditing={goToLastField}
                  ref={amountRef}
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
                  onPress={handleDateWindow}
                >
                  {formatOnlyDateShort(String(selectedDate))}
                </Button>
              </Form>
            </Container>
          </FormContainer>
        </TouchableWithoutFeedback>
        {lastField && (
          <Button
            loading={false}
            onPress={() => formRef.current?.submitForm()}
          >
            Próximo
          </Button>
        )}
      </KeyboardAvoidingVueContainer>
    </WindowContainer>
  );
}
