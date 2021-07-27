import React, { useState, useMemo } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useTransaction } from '../../../../../hooks/transactions';

import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import ITransactionDTO from '../../../../../dtos/ITransactionDTO';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { SelectTransactionButton } from '../../../../../components/TransactionComponents/SelectTransactionButton';
import Button from '../../../../../components/Button';

import {
  Container,
  Title,
  TransactionsContainer,
} from './styles';

export function SupplierTransactionsWindow() {
  const { selectedSupplier } = useMyEvent();
  const {
    supplierAgreementTransactions,
    handleSupplierTransactionsWindow,
  } = useEventSuppliers();

  const [addTransactionReceiptWindow, setAddTransactionReceiptWindow] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<ITransactionDTO[]>([]);

  function selectTransactions(data: ITransactionDTO[]) {
    setSelectedTransactions(data);
  }

  function updateAgreementAndTransactions({
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

  async function handleAddTransactionReceipt() {

  }

  function handleAddTransactionReceiptWindow() {
    setAddTransactionReceiptWindow(!addTransactionReceiptWindow);
  }

  return (
    <WindowContainer
      closeWindow={handleSupplierTransactionsWindow}
      zIndex={36}
      top="5%"
      left="0%"
      height="95%"
      width="100%"
    >
      {/* {addTransactionReceiptWindow && (
        // Fazer Componente para escolher de onde vai pegar o recibo
        // Se Tirar Foto
        // Se Selecionar Foto
        // Se Escolher arquivo do celular
        // Se Escolher arquivo de terceiros (Google Drive, etc)
      )} */}
      <Container>
        <WindowHeader overTitle={`Fornecedor: ${selectedSupplier.name}`} title="Transações" />

        {/* <Title>Selecione as transações que deseja cancelar</Title> */}

        {supplierAgreementTransactions
          && supplierAgreementTransactions.length > 0 && (
            <TransactionsContainer
              data={supplierAgreementTransactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const index = String(supplierAgreementTransactions.findIndex(transaction => transaction.id === item.id) + 1);
                return (
                  <SelectTransactionButton
                    selectTransactions={(data: ITransactionDTO[]) => selectTransactions(data)}
                    selectedTransactions={selectedTransactions}
                    index={index}
                    transaction={item.transaction}
                    key={index}
                  />
              )}}
            />
          )}
      </Container>
    </WindowContainer>
  );
}
