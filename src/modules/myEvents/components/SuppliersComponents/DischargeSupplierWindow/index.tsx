import React, { useMemo } from 'react';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import ITransactionDTO from '../../../../../dtos/ITransactionDTO';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';

import {
  Container,
  OptionsContainer,
  OptionButton,
  OptionText,
  SupplierContainer,
  SupplierTitle,
  SupplierTitleUnderline,
  SupplierResponse,
  SupplierQuestion,
} from './styles';

export function DischargeSupplierWindow() {
  const { selectedSupplier } = useMyEvent();
  const {
    handleDischargingWindow,
    handleCancelAllAgreementsWindow,
    handleDichargeOption,
    dischargeOption,
  } = useEventSuppliers();

  const selectedSupplierTransactions = useMemo(() => {

    const transactions: ITransactionDTO[] = [];
    selectedSupplier.transactionAgreements.length > 0 &&
      selectedSupplier.transactionAgreements
        .filter(agreement => !agreement.isCancelled)
        .map(agreement => {
          agreement.transactions.length > 0 &&
            agreement.transactions
              .filter(transaction => !transaction.transaction.isCancelled)
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
    handleCancelAllAgreementsWindow();
    handleDichargeOption(data);
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
        <WindowHeader title={selectedSupplier.name} overTitle="Distrato de Fornecedor" />

        <OptionsContainer>
          <OptionButton
            onPress={() => handleDischargeOption('all')}
            isActive={dischargeOption === 'all'}
          >
            <OptionText isActive={dischargeOption === 'all'}>Cancelar Contratos e Transações</OptionText>
          </OptionButton>
          <OptionButton
            onPress={() => handleDischargeOption('notPaid')}
            isActive={dischargeOption === 'notPaid'}
          >
            <OptionText isActive={dischargeOption === 'notPaid'} >Cancelar Transações Não Paga</OptionText>
          </OptionButton>
          <OptionButton
            onPress={() => handleDischargeOption('future')}
            isActive={dischargeOption === 'future'}
          >
            <OptionText isActive={dischargeOption === 'future'} >Cancelar Transações Futuras</OptionText>
          </OptionButton>
          <OptionButton
            onPress={() => handleDischargeOption('edit')}
            isActive={dischargeOption === 'edit'}
          >
            <OptionText isActive={dischargeOption === 'edit'} >Editar Contratos e Transações</OptionText>
          </OptionButton>
        </OptionsContainer>

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
