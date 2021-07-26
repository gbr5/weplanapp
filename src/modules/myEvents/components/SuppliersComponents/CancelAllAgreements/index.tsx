import React from 'react';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';

import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';

import { TransactionButton } from '../../../../../components/TransactionComponents/TransactionButton';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';

import {
  Container,
  AgreementContainer,
  AgreementButton,
  Title,
  AgreementDate,
  AgreementValue,
  AgreementsContainer,
  NumberOfInstallments,
  SectionUnderline,
  TransactionsContainer,
  AgreementIndex,
  TransactionTitleButton,
  TransactionTitleContainer,
  TransactionTitleText,
} from './styles';
import { useMemo } from 'react';
import { useState } from 'react';
import { useTransaction } from '../../../../../hooks/transactions';
import ShortConfirmationWindow from '../../../../../components/ShortConfirmationWindow';
import Button from '../../../../../components/Button';
import { Alert } from 'react-native';

export function CancelAllAgreements() {
  const { selectedSupplier } = useMyEvent();
  const {
    supplierTransactions,
    handleDischargingWindow,
    handleCancelAllAgreementsWindow,
    selectSupplierTransactionAgreement,
    selectedSupplierTransactionAgreement,
  } = useEventSuppliers();
  const { deleteAllSupplierAgreements } = useTransaction();

  const [deleteAllConfirmationWindow, setDeleteAllConfirmationWindow] = useState(false);

  function handleSelectAgreement(data: IEventSupplierTransactionAgreementDTO) {
    selectSupplierTransactionAgreement(data);
  }

  const transactions = useMemo(() => {
    if (selectedSupplierTransactionAgreement.id
      && selectedSupplierTransactionAgreement.transactions.length > 0)
        return selectedSupplierTransactionAgreement.transactions.map(transaction => transaction.transaction);
  }, [selectedSupplierTransactionAgreement]);

  async function handleDeleteAll() {
    if (!selectedSupplier.isDischarged) {
      await deleteAllSupplierAgreements();
    }
    setDeleteAllConfirmationWindow(false);
    handleCancelAllAgreementsWindow();
    handleDischargingWindow();
  }

  function handleDeleteAllConfirmationWindow() {
    setDeleteAllConfirmationWindow(!deleteAllConfirmationWindow);
  }

  return (
    <WindowContainer
      closeWindow={handleCancelAllAgreementsWindow}
      zIndex={36}
      top="5%"
      left="0%"
      height="95%"
      width="100%"
    >
      {deleteAllConfirmationWindow && (
        <ShortConfirmationWindow
          closeWindow={handleDeleteAllConfirmationWindow}
          question="Deseja deletar tudo?"
          firstButtonLabel="Deletar"
          firstFunction={handleDeleteAll}
          secondButtonLabel="Cancelar"
          secondFunction={handleDeleteAllConfirmationWindow}
        />
      )}
      <Container>
        <WindowHeader title="Cancelar Contratos" />
        <Title>Contratos</Title>
        <AgreementsContainer
          horizontal
        >
          {selectedSupplier.transactionAgreements.length > 0 &&
            selectedSupplier.transactionAgreements.map(agreement => {
              const index = selectedSupplier.transactionAgreements.findIndex(tAgreement => tAgreement.id === agreement.id) + 1;
              return (
                <AgreementContainer
                  isActive={selectedSupplierTransactionAgreement.id === agreement.id}
                  onPress={() => handleSelectAgreement(agreement)}
                  key={agreement.id}
                >
                  <AgreementIndex
                    isActive={selectedSupplierTransactionAgreement.id === agreement.id}
                  >
                    {index} )
                  </AgreementIndex>
                  <AgreementButton
                    onPress={() => handleSelectAgreement(agreement)}
                  >
                    <AgreementValue
                      isActive={selectedSupplierTransactionAgreement.id === agreement.id}
                    >
                      {formatBrlCurrency(agreement.amount)}
                    </AgreementValue>
                    <NumberOfInstallments
                    isActive={selectedSupplierTransactionAgreement.id === agreement.id}
                    >
                      x {agreement.number_of_installments}
                    </NumberOfInstallments>
                  </AgreementButton>
                  <AgreementDate
                    isActive={selectedSupplierTransactionAgreement.id === agreement.id}
                  >
                    Criado em {formatOnlyDateShort(String(agreement.created_at))}
                  </AgreementDate>
                </AgreementContainer>
              );
            })}
        </AgreementsContainer>

        <SectionUnderline />

        <TransactionTitleContainer>
          <Title>Transações</Title>

          <TransactionTitleButton
            isActive={!selectedSupplierTransactionAgreement.id}
            onPress={() => handleSelectAgreement({} as IEventSupplierTransactionAgreementDTO)}
          >
            <TransactionTitleText
              isActive={!selectedSupplierTransactionAgreement.id}
            >
              Todas
            </TransactionTitleText>
          </TransactionTitleButton>

        </TransactionTitleContainer>

        {supplierTransactions && !selectedSupplierTransactionAgreement.id && (
          <TransactionsContainer
            data={supplierTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const index = String(supplierTransactions.findIndex(transaction => transaction.id === item.id) + 1);
              return (
                <TransactionButton index={index} transaction={item} key={index} />
            )}}
          />
        )}
        {transactions
          && transactions.length > 0 && (
            <TransactionsContainer
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const index = String(transactions.findIndex(transaction => transaction.id === item.id) + 1);
                return (
                  <TransactionButton index={index} transaction={item} key={index} />
              )}}
            />
          )}
      </Container>
      <Button onPress={handleDeleteAllConfirmationWindow}>Deletar Contratos</Button>
    </WindowContainer>
  );
}
