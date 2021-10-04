import React, { useState, useMemo, useEffect } from 'react';
import { Alert } from 'react-native';

import { formatBrlCurrency } from '../../utils/formatBrlCurrency';

import { useTransaction } from '../../hooks/transactions';

import ITransactionDTO from '../../dtos/ITransactionDTO';

import ShortConfirmationWindow from '../../components/ShortConfirmationWindow';
import WindowContainer from '../../components/WindowContainer';
import { WindowHeader } from '../../components/WindowHeader';
import { AddButton } from '../../components/AddButton';
import { EventTransactionButton } from '../../components/TransactionComponents/EventTransactionButton';
import Button from '../../components/Button';

import {
  Container,
  Title,
  TransactionsContainer,
  Total,
  TitleButton,
  TitleContainer,
} from './styles';
import IEventTransactionDTO from '../../dtos/IEventTransactionDTO';
import { EventTransactionAgreementsMenu } from '../EventTransactionAgreementsMenu';
import IEventTransactionAgreementDTO from '../../dtos/IEventTransactionAgreementDTO';
import theme from '../../global/styles/theme';
import { useEventVariables } from '../../hooks/eventVariables';
import { useEventOwners } from '../../hooks/eventOwners';
import { useEventMembers } from '../../hooks/eventMembers';
import { useEventSuppliers } from '../../hooks/eventSuppliers';

interface IProps {
  closeWindow: () => void;
  overTitle: string;
  title: string;
  agreement_type: string;
  handleCreateAgreementWindow: () => void;
}

export function SelectedEventTransactionAgreementsWindow({
  closeWindow,
  overTitle,
  title,
  agreement_type,
  handleCreateAgreementWindow,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    selectTransaction,
    updateEventTransactionAgreement,
    selectedEventTransactionAgreements,
    selectedEventTransactionAgreement,
    handleSelectedEventTransactionAgreement,
    handleSelectedEventTransaction,
    handlePayer,
    handlePayee,
  } = useTransaction();

  const [cancelAgreementConfirmationWindow, setCancelAgreementConfirmationWindow] = useState(false);

  const allTransactions = useMemo(() => {
    const all: IEventTransactionDTO[] = [];
    selectedEventTransactionAgreements.map(agreement => {
      agreement.transactions.map(({ transaction }) => {
        all.push({
          agreement_id: agreement.id,
          agreement_type: agreement.participant_type,
          event_id: agreement.event_id,
          transaction: transaction,
        });
        return transaction;
      });
      return agreement;
    });
    return all;
  }, [selectedEventTransactionAgreements]);

  const selectedTransactions = useMemo(() => {
    const all: IEventTransactionDTO[] = [];
    if (selectedEventTransactionAgreement && selectedEventTransactionAgreement.id) {
      selectedEventTransactionAgreement.transactions.map(({ transaction }) => {
        all.push({
          agreement_id: selectedEventTransactionAgreement.id,
          agreement_type: selectedEventTransactionAgreement.participant_type,
          event_id: selectedEventTransactionAgreement.event_id,
          transaction,
        });
        return transaction;
      });
      return all;
    }
    return allTransactions;
  }, [allTransactions, selectedEventTransactionAgreement]);

  function handleCloseWindow() {
    handleSelectedEventTransaction({} as IEventTransactionDTO);
    handlePayee({
      id: '',
      name: '',
    });
    handlePayer({
      id: '',
      name: '',
    });
    closeWindow();
  }

  function handleCancelAgreementConfirmationWindow() {
    setCancelAgreementConfirmationWindow(!cancelAgreementConfirmationWindow);
  }

  async function cancelAgreementAndTransactions() {
    if (selectedEventTransactionAgreement) {
      const updatedTransactions = selectedEventTransactionAgreement.transactions
        .map(({ transaction }) => {
          return {
            ...transaction,
            isCancelled: true,
          };
        });

      const updatedAgreement = {
        id: selectedEventTransactionAgreement.id,
        amount: 0,
        number_of_installments: 0,
        isCancelled: true,
        transactions: updatedTransactions,
      };
      selectTransaction({} as ITransactionDTO);
      await updateEventTransactionAgreement({
        ...updatedAgreement,
        agreement_type,
      });
      handleCloseWindow();
      Alert.alert(`Contrato e transações cancelados com sucesso!`);
    }
  }

  const agreementAmount = useMemo(() => {
    if (selectedEventTransactionAgreement && selectedEventTransactionAgreement.id)
      return formatBrlCurrency(selectedEventTransactionAgreement.amount);
    if (selectedEventTransactionAgreements.length > 0) return formatBrlCurrency(selectedEventTransactionAgreements
      .map(agreement => Number(agreement.amount))
      .reduce((acc, cv) => {
        return acc + cv;
      })
    );
  }, [selectedEventTransactionAgreement]);

  function unselectAgreement() {
    handleSelectedEventTransactionAgreement({} as IEventTransactionAgreementDTO);
  }

  const isActive = useMemo(() => {
    return selectedTransactions.length === allTransactions.length
  }, [selectedTransactions, allTransactions]);

  return (
    <WindowContainer
      closeWindow={handleCloseWindow}
      zIndex={16}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      {cancelAgreementConfirmationWindow && (
        <ShortConfirmationWindow
          closeWindow={handleCancelAgreementConfirmationWindow}
          question="Deseja deletar o contrato e suas transações?"
          firstButtonLabel="Deletar"
          firstFunction={cancelAgreementAndTransactions}
          secondButtonLabel="Não Deletar"
          secondFunction={handleCancelAgreementConfirmationWindow}
        />
      )}
      <Container>
        <WindowHeader
          overTitle={overTitle}
          title={title}
        />
        <AddButton
          onPress={handleCreateAgreementWindow}
          right="5%"
          top="4%"
        />

        <TitleContainer>
          <Title>
            Contratos
          </Title>
          <TitleButton
            isActive={isActive}
            style={{
              elevation: 5,
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
            }}
            onPress={unselectAgreement}>
            <Title>Todos os contratos</Title>
          </TitleButton>
        </TitleContainer>

        <EventTransactionAgreementsMenu />
        <Total>Transações:   {agreementAmount}</Total>

        {selectedTransactions
          && selectedTransactions.length > 0 && (
            <TransactionsContainer
              data={selectedTransactions}
              keyExtractor={({ transaction }) => transaction.id}
              renderItem={({ item }) => {
                const index = String(selectedTransactions
                  .findIndex(({ transaction }) => transaction.id === item.transaction.id) + 1);
                  const year = new Date(item.transaction.due_date).getFullYear();
                  const month = new Date(item.transaction.due_date).getMonth();
                  const date = new Date(item.transaction.due_date).getDate();

                  const firstOfYear = selectedTransactions
                    .filter(({ transaction }) =>
                      new Date(transaction.due_date).getFullYear() === year
                    )[0].transaction.id === item.transaction.id;
                  const firstOfDay = selectedTransactions
                    .filter(({ transaction }) =>
                      new Date(transaction.due_date).getFullYear() === year
                      && new Date(transaction.due_date).getMonth() === month
                      && new Date(transaction.due_date).getDate() === date
                    )[0].transaction.id === item.transaction.id;

                  return (
                    <EventTransactionButton
                      firstOfDay={firstOfDay}
                      firstOfYear={firstOfYear}
                      key={item.transaction.id}
                      index={index}
                      eventTransaction={item}
                    />
              )}}
            />
          )}
      </Container>
      <Button onPress={handleCancelAgreementConfirmationWindow}>Deletar Contrato</Button>
    </WindowContainer>
  );
}
