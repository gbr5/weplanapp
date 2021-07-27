import React, { useState, useMemo } from 'react';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import ITransactionDTO from '../../../../../dtos/ITransactionDTO';
import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import IUpdateEventSupplierTransactionAgreementDTO from '../../../../../dtos/IUpdateEventSupplierTransactionAgreementDTO';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import ShortConfirmationWindow from '../../../../../components/ShortConfirmationWindow';
import Button from '../../../../../components/Button';
import { SelectTransactionButton } from '../../../../../components/TransactionComponents/SelectTransactionButton';

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

export function CancelAllAgreements() {
  const { selectedSupplier } = useMyEvent();
  const {
    dischargeOption,
    supplierTransactions,
    updateEventSupplier,
    handleDischargingWindow,
    handleCancelAllAgreementsWindow,
    handleDichargeOption,
    selectSupplierTransactionAgreement,
    selectedSupplierTransactionAgreement,
  } = useEventSuppliers();
  const {
    updateEventSupplierTransactionAgreement,
    deleteAllSupplierAgreements,
  } = useTransaction();

  const [deleteAllConfirmationWindow, setDeleteAllConfirmationWindow] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<ITransactionDTO[]>(
    supplierTransactions && dischargeOption !== 'edit' ? supplierTransactions : []
  );

  function closeWindow() {
    selectSupplierTransactionAgreement({} as IEventSupplierTransactionAgreementDTO);
    setDeleteAllConfirmationWindow(false);
    setSelectedTransactions([]);
    handleCancelAllAgreementsWindow();
    handleDichargeOption('');
  }
  function selectTransactions(data: ITransactionDTO[]) {
    setSelectedTransactions(data);
  }
  function handleSelectAgreement(data: IEventSupplierTransactionAgreementDTO) {
    selectSupplierTransactionAgreement(data);
  }

  function cancelAgreementSelectedTransactions({
    id,
    transactions,
  }: IEventSupplierTransactionAgreementDTO) {
    const updatedTransactions = transactions.map(transaction => {
      if (selectedTransactions.find(item => item.id === transaction.transaction.id)) {
        return {
          ...transaction.transaction,
          isCancelled: true,
        }
      }
      return transaction.transaction;
    });
    const newAmount = updatedTransactions
      .filter(transaction => !transaction.isCancelled)
      .map(transaction => Number(transaction.amount))
      .reduce((acc, cv) => acc + cv, 0);
    const newNumberOfInstallments = updatedTransactions
      .filter(transaction => !transaction.isCancelled).length;
    return {
      id,
      amount: newAmount,
      number_of_installments: newNumberOfInstallments,
      isCancelled: newAmount === 0,
      transactions: updatedTransactions,
    }
  }

  async function handleDeleteSelectedTransactios() {
    const agreements: IUpdateEventSupplierTransactionAgreementDTO[] = [];
    selectedSupplier.transactionAgreements.map(agreement => {
      const updatedAgreement = cancelAgreementSelectedTransactions(agreement);
      agreements.push(updatedAgreement);
      return updatedAgreement;
    });
    Promise.all([
      agreements.map(agreement => {
        return updateEventSupplierTransactionAgreement(agreement);
      }),
    ]);
    await updateEventSupplier({
      ...selectedSupplier,
      isDischarged: true,
      isHired: false,
    });
    closeWindow();
    handleDischargingWindow();
  }
  const transactions = useMemo(() => {
    const today = new Date();
    if (dischargeOption === 'all' || dischargeOption === 'edit') {
      if (selectedSupplierTransactionAgreement.id
        && selectedSupplierTransactionAgreement.transactions.length > 0) {
          const updatedTransactions = selectedSupplierTransactionAgreement.transactions
            .filter(transaction => !transaction.transaction.isCancelled)
            .map(transaction => transaction.transaction)
            .sort((a, b) => {
              if (new Date(a.due_date) > new Date(b.due_date)) return 1
              if (new Date(a.due_date) < new Date(b.due_date)) return -1
              return 0
            });
          dischargeOption === 'all' && setSelectedTransactions(updatedTransactions);
          return updatedTransactions;
        }
      const updatedTransactions = supplierTransactions && supplierTransactions
        .filter(transaction => !transaction.isCancelled)
        .map(transaction => transaction)
        .sort((a, b) => {
          if (new Date(a.due_date) > new Date(b.due_date)) return 1
          if (new Date(a.due_date) < new Date(b.due_date)) return -1
          return 0
        });
      dischargeOption === 'all' && updatedTransactions && setSelectedTransactions(updatedTransactions);
      return updatedTransactions;
    }

    if (supplierTransactions && supplierTransactions.length > 0) {
      if (dischargeOption === 'notPaid') {
        const updatedTransactions = supplierTransactions.filter(transaction => transaction.isCancelled === false && transaction.isPaid === false);
        setSelectedTransactions(updatedTransactions);
        return updatedTransactions;
      }
      const updatedTransactions = supplierTransactions.filter(transaction =>
        new Date(transaction.due_date) > today,
      );
      setSelectedTransactions(updatedTransactions.filter(transaction => !transaction.isPaid));
      return updatedTransactions;
    }
  }, [selectedSupplierTransactionAgreement, supplierTransactions, dischargeOption]);
  async function handleDeleteAll() {
    if (supplierTransactions && selectedTransactions.length < supplierTransactions.length)
      return handleDeleteSelectedTransactios();
    if (!selectedSupplier.isDischarged) {
      await deleteAllSupplierAgreements();
    }

    closeWindow();
    handleDischargingWindow();
  }

  function handleDeleteAllConfirmationWindow() {
    setDeleteAllConfirmationWindow(!deleteAllConfirmationWindow);
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={36}
      top="5%"
      left="0%"
      height="95%"
      width="100%"
    >
      {deleteAllConfirmationWindow && (
        <ShortConfirmationWindow
          closeWindow={handleDeleteAllConfirmationWindow}
          question="Deseja cancelar as transações selecionadas?"
          firstButtonLabel="Deletar"
          firstFunction={handleDeleteAll}
          secondButtonLabel="Cancelar"
          secondFunction={handleDeleteAllConfirmationWindow}
        />
      )}
      <Container>
        {dischargeOption === 'all' && (
          <>
            <WindowHeader overTitle="Distrato de Fornecedor" title="Cancelar Contratos e Transações" />
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
          </>
        )}
        {dischargeOption === 'edit' && (
          <>
            <WindowHeader overTitle="Distrato de Fornecedor" title="Editar Contratos e Transações" />
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
          </>
        )}
        {dischargeOption === 'notPaid' && (
          <>
            <WindowHeader overTitle="Distrato de Fornecedor" title="Cancelar Transações Não Pagas" />
            <Title>Selecione as transações que deseja cancelar</Title>
          </>
        )}
        {dischargeOption === 'future' && (
          <>
            <WindowHeader overTitle="Distrato de Fornecedor" title="Cancelar Transações Futuras" />
            <Title>Selecione as transações que deseja cancelar</Title>
          </>
        )}

        {supplierTransactions
          && supplierTransactions.length > 0
          && dischargeOption === 'all'
          && !selectedSupplierTransactionAgreement.id && (
            <TransactionsContainer
              data={supplierTransactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const index = String(supplierTransactions.findIndex(transaction => transaction.id === item.id) + 1);
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) => selectTransactions(data)}
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
              )}}
            />
          )}
        {supplierTransactions
          && supplierTransactions.length > 0
          && dischargeOption === 'edit'
          && !selectedSupplierTransactionAgreement.id && (
            <TransactionsContainer
              data={supplierTransactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const index = String(supplierTransactions.findIndex(transaction => transaction.id === item.id) + 1);
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) => selectTransactions(data)}
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
              )}}
            />
          )}
        {transactions
          && transactions.length > 0
          && (dischargeOption === 'all'
          && !!selectedSupplierTransactionAgreement.id) && (
            <TransactionsContainer
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const index = String(transactions.findIndex(transaction => transaction.id === item.id) + 1);
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) => selectTransactions(data)}
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
              )}}
            />
          )}
        {transactions
          && transactions.length > 0
          && (dischargeOption === 'edit'
          && !!selectedSupplierTransactionAgreement.id) && (
            <TransactionsContainer
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const index = String(transactions.findIndex(transaction => transaction.id === item.id) + 1);
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) => selectTransactions(data)}
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
              )}}
            />
          )}
        {transactions
          && transactions.length > 0
          && dischargeOption === 'notPaid' && (
            <TransactionsContainer
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const index = String(transactions.findIndex(transaction => transaction.id === item.id) + 1);
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) => selectTransactions(data)}
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
              )}}
            />
          )}
        {transactions
          && transactions.length > 0
          && dischargeOption === 'future' && (
            <TransactionsContainer
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const index = String(transactions.findIndex(transaction => transaction.id === item.id) + 1);
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) => selectTransactions(data)}
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item}
                    key={index}
                  />
              )}}
            />
          )}
      </Container>
      <Button onPress={handleDeleteAllConfirmationWindow}>Cancelar Transações</Button>
    </WindowContainer>
  );
}
