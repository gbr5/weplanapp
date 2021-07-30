import React, { useState } from 'react';
import { Alert } from 'react-native';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useTransaction } from '../../../../../hooks/transactions';

import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import ITransactionDTO from '../../../../../dtos/ITransactionDTO';
import IEventSupplierTransactionDTO from '../../../../../dtos/IEventSupplierTransactionDTO';
import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';

import ShortConfirmationWindow from '../../../../../components/ShortConfirmationWindow';
import Backdrop from '../../../../../components/Backdrop';
import { DatePickerWindow } from '../../../../../components/DatePickerWindow';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { TransactionButton } from '../../../../../components/TransactionComponents/TransactionButton';

import {
  Container,
  Title,
  TransactionsContainer,
} from './styles';
import { useMemo } from 'react';

export function EventSupplierAgreementTransactionsWindow() {
  const {
    selectedSupplier,
    getEventSuppliers,
    selectSupplier,
    selectedEvent,
    eventSuppliers,
  } = useMyEvent();
  const {
    supplierAgreementTransactions,
    selectSupplierTransaction,
    selectSupplierTransactionAgreement,
    selectedSupplierTransactionAgreement,
    handleEditTransactionValueWindow,
    handleEventSupplierAgreementTransactionsWindow,
  } = useEventSuppliers();
  const {
    selectTransaction,
    selectedTransaction,
    updateEventSupplierTransactionAgreement,
    editTransactionDueDateWindow,
    handleEditTransactionDueDateWindow,
    editTransaction,
  } = useTransaction();

  const [loading, setLoading] = useState(false);
  const [addTransactionReceiptWindow, setAddTransactionReceiptWindow] = useState(false);
  const [transactionToCancel, setTransactionToCancel] = useState({} as ITransactionDTO);

  function closeWindow() {
    handleEventSupplierAgreementTransactionsWindow();
    setAddTransactionReceiptWindow(false);
    selectSupplier({} as IEventSupplierDTO);
    setTransactionToCancel({} as ITransactionDTO);
    selectSupplierTransaction({} as IEventSupplierTransactionDTO);
    selectSupplierTransactionAgreement({} as IEventSupplierTransactionAgreementDTO);
  }

  function selectTransactionToCancel(data: ITransactionDTO) {
    setTransactionToCancel(data);
  }

  async function handleAddTransactionReceipt() {

  }

  function handleAddTransactionReceiptWindow() {
    setAddTransactionReceiptWindow(!addTransactionReceiptWindow);
  }

  async function handleEditTransactionDueDate(data: Date) {
    try {
      setLoading(true);
      await editTransaction({
        ...selectedTransaction,
        due_date: new Date(data),
      });
      await getEventSuppliers(selectedEvent.id);
      handleEditTransactionDueDateWindow();
    } catch (err) {
      Alert.alert('Não foi possível atualizar a data!','Tente novamente.')
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  function refreshAgreement() {
    const findAgreement = selectedSupplier.transactionAgreements.find(item => item.id === selectedSupplierTransactionAgreement.id);
    findAgreement && selectSupplierTransactionAgreement(findAgreement);
  }

  async function handleIsPaid() {
    try {
      setLoading(true);
      await editTransaction({
        ...selectedTransaction,
        isPaid: !selectedTransaction.isPaid,
      });
      await getEventSuppliers(selectedEvent.id);
      handleEventSupplierAgreementTransactionsWindow();
    } catch (err) {
      throw new Error(err);
    } finally {
      refreshAgreement();
      setLoading(false);
    }
  }

  function editTransactionValue(data: ITransactionDTO) {
    if (supplierAgreementTransactions) {
      const agreementTransaction = supplierAgreementTransactions.find(transaction => transaction.transaction.id === data.id);
      if (agreementTransaction) {
        const selectedAgreement = selectedSupplier.transactionAgreements.find(agreement => agreement.id === agreementTransaction.agreement_id);
        selectSupplierTransaction(agreementTransaction);
        selectedAgreement && selectSupplierTransactionAgreement(selectedAgreement);
        handleEditTransactionValueWindow();
      }
    }
  }

  async function cancelTransaction(data: ITransactionDTO) {
    if (supplierAgreementTransactions) {
      const agreementTransaction = supplierAgreementTransactions
        .find(transaction => transaction.transaction.id === data.id);

      if (agreementTransaction) {
        const selectedAgreement = selectedSupplier.transactionAgreements
          .find(agreement => agreement.id === agreementTransaction.agreement_id);

        if (selectedAgreement) {
          const agreementAmount = formatBrlCurrency(selectedAgreement.amount);

          const agreementNewValue =
            Number(selectedAgreement.amount) - Number(data.amount);

          const agreementNewAmount = formatBrlCurrency(agreementNewValue);

          const message =
            `O contrato foi atualizado de ${agreementAmount} para ${agreementNewAmount}`;

          const number_of_installments = selectedAgreement.transactions
            .filter(transaction => !transaction.transaction.isCancelled && transaction.transaction.amount !== 0)
            .length;

          const transactions = [{
            ...data,
            isCancelled: true,
          }];

          selectTransaction({} as ITransactionDTO);
          const {
            id,
          } = selectedAgreement;
          await updateEventSupplierTransactionAgreement({
            amount: agreementNewValue,
            id,
            isCancelled: agreementNewValue === 0,
            number_of_installments,
            transactions,
          });
          closeWindow();
          Alert.alert(`Transação cancelada com sucesso!`, message);
        }
      }
    }
  }

  const transactionsSum = useMemo(() => {
    if (selectedSupplierTransactionAgreement.transactions.length > 0)
      return formatBrlCurrency(
        selectedSupplierTransactionAgreement.transactions
          .filter(agreementTransaction => !agreementTransaction.transaction.isCancelled)
          .map(agreementTransaction => Number(agreementTransaction.transaction.amount))
          .reduce((acc, cv) => acc + cv, 0)
        );
  }, [selectedSupplierTransactionAgreement, eventSuppliers]);

  const transactions = useMemo(() => {
    if (selectedSupplierTransactionAgreement.transactions.length > 0)
      return selectedSupplierTransactionAgreement.transactions
        .filter(agreementTransaction => !agreementTransaction.transaction.isCancelled)
        .map(agreementTransaction => agreementTransaction.transaction)
        .sort((a, b) => {
          if (new Date(a.due_date) > new Date(b.due_date)) return 1;
          if (new Date(a.due_date) < new Date(b.due_date)) return -1;
          return 0;
        });
  }, [selectedSupplierTransactionAgreement, eventSuppliers]);

  return (
    <WindowContainer
      closeWindow={closeWindow}
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
      {editTransactionDueDateWindow
        && selectedTransaction && selectedTransaction.id && (
          <DatePickerWindow
            zIndex={40}
            closeWindow={handleEditTransactionDueDateWindow}
            loading={loading}
            selectDate={(data: Date) => handleEditTransactionDueDate(data)}
            selectedDate={new Date(selectedTransaction.due_date)}
          />
        )}
      {transactionToCancel && transactionToCancel.id && (
        <>
          <Backdrop
            zIndex={37}
            left="0%"
            closeFunction={() => selectTransactionToCancel({} as ITransactionDTO)}
          />
          <ShortConfirmationWindow
            closeWindow={() => selectTransactionToCancel({} as ITransactionDTO)}
            question="Deseja deletar a transação? O contrato também será alterado."
            firstButtonLabel="Deletar"
            firstFunction={() => cancelTransaction(transactionToCancel)}
            secondButtonLabel="Cancelar"
            secondFunction={() => selectTransactionToCancel({} as ITransactionDTO)}
            left="4%"
            backdropLeft="10%"
          />
        </>
      )}
      <Container>
        <WindowHeader
          overTitle={`Contrato: ${formatBrlCurrency(selectedSupplierTransactionAgreement.amount)}`}
          title="Transações"
        />

        <Title>Total:  {transactionsSum}</Title>

        {transactions
          && transactions.length > 0 && (
              <TransactionsContainer
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const index = String(transactions
                    .findIndex(transaction => transaction.id === item.id) + 1);
                  return (
                    <TransactionButton
                      handleIsPaid={handleIsPaid}
                      cancelTransaction={
                        (data: ITransactionDTO) =>
                          selectTransactionToCancel(data)}
                      editTransactionValue={
                        (data: ITransactionDTO) => editTransactionValue(data)}
                      index={index}
                      transaction={item}
                      key={index}
                    />
                )}}
              />
            )}
      </Container>
    </WindowContainer>
  );
}
