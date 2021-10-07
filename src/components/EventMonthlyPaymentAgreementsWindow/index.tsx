import React, { useState, useMemo } from 'react';

import { formatBrlCurrency } from '../../utils/formatBrlCurrency';

import { useTransaction } from '../../hooks/transactions';

import ShortConfirmationWindow from '../../components/ShortConfirmationWindow';
import WindowContainer from '../../components/WindowContainer';
import { WindowHeader } from '../../components/WindowHeader';
import { AddButton } from '../../components/AddButton';
import Button from '../../components/Button';

import {
  Container,
  Title,
  Total,
  TitleButton,
  TitleContainer,
} from './styles';
import { EventMonthlyPaymentAgreementsMenu } from '../EventMonthlyPaymentAgreementsMenu';
import theme from '../../global/styles/theme';
import { EventTransactionAgreementFlatList } from '../EventTransactionAgreementFlatList';
import { useEventVariables } from '../../hooks/eventVariables';
import IEventMonthlyPaymentAgreementDTO from '../../dtos/IEventMonthlyPaymentAgreementDTO';
import IParticipantDTO from '../../dtos/IParticipantDTO';
import { MenuBooleanButton } from '../MenuBooleanButton';
import IEventTransactionDTO from '../../dtos/IEventTransactionDTO';
import { EventTransactionFlatList } from '../EventTransactionFlatList';

export function EventMonthlyPaymentAgreementsWindow() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    monthlyPayments,
    handleMonthlyPaymentWindow,
    selectEventMonthlyPaymentAgreement,
    handleEventTransactions,
    handleSelectMonthlyPaymentAgreementParticipantWindow,
    handleSelectedParticipants,
    handleParticipants,
    eventMembers,
    selectedEvent,
    eventOwners,
    eventTransactions,
  } = useEventVariables();
  const {
    selectedEventTransactionAgreements,
    handleSelectedEventTransactionAgreements,
  } = useTransaction();

  const [cancelAgreementConfirmationWindow, setCancelAgreementConfirmationWindow] = useState(false);
  const [section, setSection] = useState<'contracts' | 'transactions'>('contracts');

  function handleCloseWindow() {
    handleMonthlyPaymentWindow();
  }

  function handleCancelAgreementConfirmationWindow() {
    setCancelAgreementConfirmationWindow(!cancelAgreementConfirmationWindow);
  }

  function handleOpenSelectParticipantWindow() {
    const participants: IParticipantDTO[] = [];
    eventMembers.map(eventMember => {
      return participants.push({
        participant_id: eventMember.id,
        participant_name: eventMember.userEventMember.name,
        participant_type: 'member',
      });
    });
    eventOwners.map(eventOwner => {
      return participants.push({
        participant_id: eventOwner.id,
        participant_name: eventOwner.userEventOwner.name,
        participant_type: 'owner',
      });
    });
    handleParticipants(participants);
    handleSelectedParticipants([]);
    handleSelectMonthlyPaymentAgreementParticipantWindow();
  }

  // async function cancelAgreementAndTransactions() {
  //   if (selectedEventTransactionAgreement) {
  //     const updatedTransactions = selectedEventTransactionAgreement.transactions
  //       .map(({ transaction }) => {
  //         return {
  //           ...transaction,
  //           isCancelled: true,
  //         };
  //       });

  //     const updatedAgreement = {
  //       id: selectedEventTransactionAgreement.id,
  //       amount: 0,
  //       number_of_installments: 0,
  //       isCancelled: true,
  //       transactions: updatedTransactions,
  //     };
  //     selectTransaction({} as ITransactionDTO);
  //     await updateEventTransactionAgreement({
  //       ...updatedAgreement,
  //       agreement_type,
  //     });
  //     handleCloseWindow();
  //     Alert.alert(`Contrato e transações cancelados com sucesso!`);
  //   }
  // }

  const eventMonthlyPaymentTransactions = useMemo(() => {
    const transactions: IEventTransactionDTO[] = [];
    monthlyPayments.transactionAgreements.map(agreement => {
      agreement.transactions.map(({ transaction }) => {
        transactions.push({
          agreement_id: agreement.id,
          agreement_type: agreement.participant_type,
          event_id: selectedEvent.id,
          transaction,
        });
        return transaction;
      });
      return agreement;
    });
    return transactions;
  }, [monthlyPayments]);

  function unselectAgreement() {
    selectEventMonthlyPaymentAgreement({} as IEventMonthlyPaymentAgreementDTO);
    handleSelectedEventTransactionAgreements(monthlyPayments.transactionAgreements);
    handleEventTransactions(eventMonthlyPaymentTransactions);
  }

  const isActive = useMemo(() => {
    return selectedEventTransactionAgreements.length === monthlyPayments.transactionAgreements.length
  }, [monthlyPayments, selectedEventTransactionAgreements]);

  function handleSection(data: 'contracts' | 'transactions') {
    setSection(data);
  }

  return (
    <WindowContainer
      closeWindow={handleCloseWindow}
      zIndex={16}
      top="0%"
      left="0%"
      height="100%"
      width="100%"
    >
      {cancelAgreementConfirmationWindow && (
        <ShortConfirmationWindow
          closeWindow={handleCancelAgreementConfirmationWindow}
          question="Deseja deletar o contrato e suas transações?"
          firstButtonLabel="Deletar"
          firstFunction={handleCancelAgreementConfirmationWindow}
          secondButtonLabel="Não Deletar"
          secondFunction={handleCancelAgreementConfirmationWindow}
        />
      )}
      <Container>
        <WindowHeader
          overTitle="Gerenciar"
          title="Mensalidades"
        />
        <AddButton
          onPress={handleOpenSelectParticipantWindow}
          right="5%"
          top="4%"
        />

        <TitleContainer>
          <Title>
            Modelos:
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
            <Title>Ver Todos</Title>
          </TitleButton>
        </TitleContainer>

        <EventMonthlyPaymentAgreementsMenu />

        <MenuBooleanButton
          firstActive={section === 'contracts'}
          firstFunction={() => handleSection('contracts')}
          firstLabel="Contratos"
          secondFunction={() => handleSection('transactions')}
          secondLabel="Transações"
        />
        {section === 'contracts' && selectedEventTransactionAgreements.length > 0 && (
          <EventTransactionAgreementFlatList
            transactionAgreements={selectedEventTransactionAgreements}
          />
        )}
        {section === 'transactions' && eventTransactions.length > 0 && (
          <EventTransactionFlatList
            month={eventTransactions.length > 10}
            transactions={eventTransactions}
            year={true}
          />
        )}
      </Container>
    </WindowContainer>
  );
}
