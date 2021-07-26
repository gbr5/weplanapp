import React, { useMemo, useState } from 'react';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import ITransactionDTO from '../../../../../dtos/ITransactionDTO';

import { TransactionButton } from '../../../../../components/TransactionComponents/TransactionButton';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';

import {
  Container,
  OptionButton,
  OptionText,
  OptionsContainer,
  SupplierNameContainer,
  SupplierContainer,
  SupplierNameTitle,
  SupplierTitleUnderline,
  SupplierTitle,
  SupplierNameResponse,
  SupplierResponse,
  SupplierQuestion,
  TransactionsContainer,
} from './styles';

export function DischargeSupplierWindow() {
  const { selectedSupplier } = useMyEvent();
  const {
    handleDischargingWindow,
    handleCancelAllAgreementsWindow,
  } = useEventSuppliers();

  const [dischargeOption, setDischargeOption] = useState('');

  const selectedSupplierTransactions = useMemo(() => {

    const transactions: ITransactionDTO[] = [];
    selectedSupplier.transactionAgreements.length > 0 &&
      selectedSupplier.transactionAgreements
        .map(agreement => {
          agreement.transactions.length > 0 &&
            agreement.transactions
              .map(agreementTransaction =>
                agreementTransaction.transaction &&
                  transactions.push(agreementTransaction.transaction));
        });
    const debitTransactions = transactions.filter(
      transaction => transaction.payee_id === selectedSupplier.id
    );

    const debitValue = debitTransactions
      .map(transaction => Number(transaction.amount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const paidValue = debitTransactions
      .filter(transaction => transaction.isPaid)
      .map(transaction => Number(transaction.amount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const creditTransactions = transactions
      .filter(transaction => transaction.payer_id === selectedSupplier.id);

    const creditValue = creditTransactions
      .map(transaction => Number(transaction.amount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const receivedValue = creditTransactions
      .filter(transaction => transaction.isPaid)
      .map(transaction => Number(transaction.amount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const balance = formatBrlCurrency(receivedValue - paidValue);
    const toReceive = formatBrlCurrency(creditValue - receivedValue);
    const toPay = formatBrlCurrency(debitValue - paidValue);

    return {
      transactions,
      debitTransactions,
      debitValue,
      creditTransactions,
      creditValue,
      balance,
      paidValue: formatBrlCurrency(paidValue),
      receivedValue: formatBrlCurrency(receivedValue),
      toReceive,
      toPay,
    };
  }, [selectedSupplier]);

  const totalAgreements = useMemo(() => {
    const agreementsTotal = selectedSupplier.transactionAgreements
      .map(agreement => Number(agreement.amount))
      .reduce((acc, cv) => acc + cv, 0);
    return formatBrlCurrency(agreementsTotal);
  }, [selectedSupplier]);

  function handleDischargeOption(data: string) {
    data === 'all' && handleCancelAllAgreementsWindow();
    setDischargeOption(data);
  }

  return (
    <WindowContainer
      closeWindow={handleDischargingWindow}
      zIndex={25}
      top="5%"
      left="0%"
      height="95%"
      width="100%"
    >
      <Container>
        <WindowHeader title="Distrato" />

        <SupplierNameContainer>
          <SupplierNameTitle>Fornecedor</SupplierNameTitle>
          <SupplierNameResponse>{selectedSupplier.name}</SupplierNameResponse>
        </SupplierNameContainer>

        <OptionsContainer>
          <OptionButton
            onPress={() => handleDischargeOption('all')}
            isActive={dischargeOption === 'all'}
          >
            <OptionText isActive={dischargeOption === 'all'}>Cancelar Contratos e Transações</OptionText>
          </OptionButton>
          <OptionButton
            onPress={() => handleDischargeOption('partial')}
            isActive={dischargeOption === 'partial'}
          >
            <OptionText isActive={dischargeOption === 'partial'} >Cancelar Transações Futuras</OptionText>
          </OptionButton>
          <OptionButton
            onPress={() => handleDischargeOption('edit')}
            isActive={dischargeOption === 'edit'}
          >
            <OptionText isActive={dischargeOption === 'edit'} >Editar Contratos e Transações</OptionText>
          </OptionButton>
        </OptionsContainer>


{/*
        <SupplierTitle>Transações</SupplierTitle>
        <SupplierTitleUnderline />

        <TransactionsContainer
          data={eventDebitTransactions}
          keyExtractor={( item ) => item.id}
          renderItem={({ item }) => {
            const index = eventDebitTransactions
              .findIndex(transaction => transaction.id === item.id);
            return (
              <TransactionButton index={`${index + 1}`} key={item.id} transaction={item} />
            )
          }}
        /> */}

        <SupplierTitle>Contratos ({selectedSupplier.transactionAgreements.length})</SupplierTitle>
        <SupplierTitleUnderline />

        <SupplierContainer>
          <SupplierQuestion>Valor Total</SupplierQuestion>
          <SupplierResponse>{totalAgreements}</SupplierResponse>
        </SupplierContainer>

        <SupplierTitle>
          Transações ({selectedSupplierTransactions.transactions.length})
        </SupplierTitle>
        <SupplierTitleUnderline />

        <SupplierContainer>
          <SupplierQuestion>Resultado</SupplierQuestion>
          <SupplierResponse>{selectedSupplierTransactions.balance}</SupplierResponse>
        </SupplierContainer>
        <SupplierContainer>
          <SupplierQuestion>Pago</SupplierQuestion>
          <SupplierResponse>{selectedSupplierTransactions.paidValue}</SupplierResponse>
        </SupplierContainer>
        <SupplierContainer>
          <SupplierQuestion>Recebido</SupplierQuestion>
          <SupplierResponse>{selectedSupplierTransactions.toReceive}</SupplierResponse>
        </SupplierContainer>
        <SupplierContainer>
          <SupplierQuestion>A Pagar</SupplierQuestion>
          <SupplierResponse>{selectedSupplierTransactions.toPay}</SupplierResponse>
        </SupplierContainer>
        <SupplierContainer>
          <SupplierQuestion>A Receber</SupplierQuestion>
          <SupplierResponse>{selectedSupplierTransactions.toReceive}</SupplierResponse>
        </SupplierContainer>

      </Container>
    </WindowContainer>
  );
}
