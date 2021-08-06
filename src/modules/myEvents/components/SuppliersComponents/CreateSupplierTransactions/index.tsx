import React, { useMemo, useState } from 'react';
import { addMonths, addDays, getDay } from 'date-fns';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import formatOnlyDate from '../../../../../utils/formatOnlyDate';

import WindowContainer from '../../../../../components/WindowContainer';
import { SelectInstallmentSequence } from '../../../../../components/SelectInstallmentSequence';
import Button from '../../../../../components/Button';

import ICreateTransactionDTO from '../../../../../dtos/ICreateTransactionDTO';

import {
  Container,
  QuestionContainer,
  DateQuestionContainer,
  Title,
  IconButton,
  Icon,
  Question,
  Underline,
  QuestionUnderline,
  BackButton,
  BackText,
  TitleContainer,
  ResponseText,
  ResponseButtonText,
  QuestionButton,
} from './styles';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';

export function CreateSupplierTransactions() {
  const { selectedSupplier, selectedEvent, selectSupplier } = useMyEvent();
  const {
    handleCreateSupplierTransactionsWindow,
    handleCreateSupplierTransactionAgreementWindow,
  } = useEventSuppliers();
  const {
    newAgreementInstallments,
    handleNewAgreement,
    newAgreementAmount,
    selectedDate,
    handleSelectedDateWindow,
    handleNewEventSupplierTransactionAgreement,
    selectNewTransactions,
    handleSelectedDate,
  } = useTransaction();

  const [isInstallmentsSameValue, setIsInstallmentsSameValue] = useState(true);
  const [installmentSequence, setInstallmentSequence] = useState('Monthly');
  const [selectInstallmentSequenceWindow, setSelectInstallmentSequenceWindow] = useState(false);

  function handleIsSameValue() {
    setIsInstallmentsSameValue(!isInstallmentsSameValue);
  }

  function handleSelectInstallmentSequenceWindow() {
    setSelectInstallmentSequenceWindow(!selectInstallmentSequenceWindow);
  }

  function handleInstallmentSequence(data: string) {
    setInstallmentSequence(data);
  }

  function handleSubmit() {
    const transactions: ICreateTransactionDTO[] = [];

    if (isInstallmentsSameValue && installmentSequence === 'Monthly') {
      let i = 0;
      for (; i < newAgreementInstallments; i++) {
        transactions.push({
          name: '',
          amount: newAgreementAmount/newAgreementInstallments,
          due_date: addMonths(selectedDate, i),
          isPaid: false,
          payee_id: selectedSupplier.id,
          payer_id: selectedEvent.id,
        });
      }
    }
    if (isInstallmentsSameValue && installmentSequence === 'Weekly') {
      const transactions: ICreateTransactionDTO[] = [];
      for (let i = 0; i < newAgreementInstallments; i += 1) {
        transactions.push({
          name: '',
          amount: newAgreementAmount/newAgreementInstallments,
          due_date: addDays(selectedDate, i * 7),
          isPaid: false,
          payee_id: selectedSupplier.id,
          payer_id: selectedEvent.id,
        })
      }
    }
    selectNewTransactions(transactions);
    handleNewEventSupplierTransactionAgreement();
    handleCreateSupplierTransactionsWindow();
  }

  function handleGoBack() {
    handleCreateSupplierTransactionAgreementWindow();
    handleCreateSupplierTransactionsWindow();
  }

  function closeWindow() {
    selectNewTransactions([]);
    handleNewAgreement({
      amount: 0,
      installments: 1,
    });
    handleCreateSupplierTransactionsWindow();
    selectSupplier({} as IEventSupplierDTO);
    handleSelectedDate(addDays(new Date(), 3));
  }

  const dayOfWeek = useMemo(() => {
    const day = getDay(selectedDate);
    if (day === 0) return 'Todo Domingo';
    if (day === 1) return 'Toda Segunda';
    if (day === 2) return 'Toda Terça';
    if (day === 3) return 'Toda Quarta';
    if (day === 4) return 'Toda Quinta';
    if (day === 5) return 'Toda Sexta';
    return 'Sábado';
  }, [selectedDate]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={15}
      top="5%"
      left="2%"
      height="90%"
      width="96%"
    >
      {selectInstallmentSequenceWindow && (
        <SelectInstallmentSequence
          closeWindow={handleSelectInstallmentSequenceWindow}
          selectSequence={(data: string) => handleInstallmentSequence(data)}
          selectedSequence={installmentSequence}
        />
      )}
      <Container>
        <BackButton
          onPress={handleGoBack}
        >
          <BackText>Voltar</BackText>
        </BackButton>
        <Title>Contrato com {selectedSupplier.name}</Title>
        <Underline />
        <TitleContainer>
          <Question>Valor do Contrato: </Question>
          <ResponseText>{formatBrlCurrency(newAgreementAmount)}</ResponseText>
        </TitleContainer>
        <QuestionUnderline />
        <TitleContainer>
          <Question>Número de parcelas: </Question>
          <ResponseText>{newAgreementInstallments}</ResponseText>
        </TitleContainer>
        <QuestionUnderline />
        {newAgreementInstallments >= 1 && (
          <>
            {newAgreementInstallments > 1 && (
              <QuestionContainer>
                <Question>Parcelas Iguais:</Question>
                <IconButton
                  onPress={handleIsSameValue}
                >
                  {isInstallmentsSameValue ? (
                    <Icon name="check-square" />
                  ) : (
                    <Icon name="square" />
                  )}
                </IconButton>
              </QuestionContainer>
            )}

            <DateQuestionContainer>

              <Question>
                {newAgreementInstallments > 1
                  ? 'Data da primeira parcela'
                  : 'Data do Pagamento'
                }
              </Question>
              <QuestionUnderline />

              <QuestionButton
                onPress={handleSelectedDateWindow}
              >
                <ResponseButtonText>{formatOnlyDate(String(selectedDate))}</ResponseButtonText>
              </QuestionButton>
            </DateQuestionContainer>
            {newAgreementInstallments > 1 && (
              <>
                <Question>Data das próximas parcelas</Question>
                <QuestionUnderline />

                <QuestionButton
                  onPress={handleSelectInstallmentSequenceWindow}
                >
                  {installmentSequence === `Monthly` && (
                    <ResponseButtonText>{`Mensal: Todo dia ${new Date(selectedDate).getDate()}`}</ResponseButtonText>
                  )}
                  {installmentSequence === `Weekly` && (
                    <ResponseButtonText>{`Semanal: ${dayOfWeek}`}</ResponseButtonText>
                  )}
                  {installmentSequence === 'Customized' && (
                    <ResponseButtonText>Personalizado</ResponseButtonText>
                  )}
                </QuestionButton>
              </>
            )}
          </>
        )}
        <Button onPress={handleSubmit}>Próximo</Button>
      </Container>
    </WindowContainer>
  );
}
