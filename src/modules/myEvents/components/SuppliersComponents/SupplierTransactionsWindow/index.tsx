import React, { useState } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useTransaction } from '../../../../../hooks/transactions';

import IEventSupplierTransactionAgreementDTO from '../../../../../dtos/IEventSupplierTransactionAgreementDTO';
import ITransactionDTO from '../../../../../dtos/ITransactionDTO';

import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { TransactionButton } from '../../../../../components/TransactionComponents/TransactionButton';

import {
  Container,
  TransactionsContainer,
} from './styles';
import IEventSupplierTransactionDTO from '../../../../../dtos/IEventSupplierTransactionDTO';
import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import { Alert } from 'react-native';
import ShortConfirmationWindow from '../../../../../components/ShortConfirmationWindow';
import Backdrop from '../../../../../components/Backdrop';
import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';
import { DatePickerWindow } from '../../../../../components/DatePickerWindow';

export function SupplierTransactionsWindow() {
  const {
    selectedSupplier,
    getEventSuppliers,
    selectSupplier,
    selectedEvent,
  } = useMyEvent();
  const {
    supplierAgreementTransactions,
    selectSupplierTransaction,
    selectSupplierTransactionAgreement,
    handleEditTransactionValueWindow,
    handleSupplierTransactionsWindow,
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
    handleSupplierTransactionsWindow();
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

  function handleAddTransactionReceiptWindow() {
    setAddTransactionReceiptWindow(!addTransactionReceiptWindow);
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
          overTitle={`Fornecedor: ${selectedSupplier.name}`}
          title="Transações"
        />

        {/* <Title>Selecione as transações que deseja cancelar</Title> */}

        {supplierAgreementTransactions
          && supplierAgreementTransactions.length > 0
          && supplierAgreementTransactions
            .filter(transaction => !transaction.transaction.isCancelled) && (
              <TransactionsContainer
                data={supplierAgreementTransactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const index = String(supplierAgreementTransactions
                    .findIndex(transaction => transaction.id === item.id) + 1);
                  return (
                    <TransactionButton
                      cancelTransaction={
                        (data: ITransactionDTO) =>
                          selectTransactionToCancel(data)}
                      editTransactionValue={
                        (data: ITransactionDTO) => editTransactionValue(data)}
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
