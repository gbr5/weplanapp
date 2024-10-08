import React, { useMemo } from 'react';
import { EventTransactionAgreementFlatList } from '../../../../../components/EventTransactionAgreementFlatList';
import theme from '../../../../../global/styles/theme';
import { useEventVariables } from '../../../../../hooks/eventVariables';

import { useMyEvent } from '../../../../../hooks/myEvent';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';
import { EventBudgetButton } from '../EventBudgetButton';

import { EventTransactionSection } from '../EventTransactionSection';

import {
  Container,
  MonthlyPaymentButton,
  Body,
  TitleButton,
  Title,
  FirstSection,
  BudgetTitle,
  BudgetValue,
  Resume,
  ResumeUnderline,
  PercentageUnderline,
  ResumeTitle,
  ResumeValue,
  SectionButton,
  MenuButton,
  MenuIcon,
} from './styles';

export function FinancialSection() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.menuShadow;
  const {
    eventBudget,
    eventTransactions,
    selectedEvent,
    eventTransactionAgreements,
    monthlyPayments,
    handleMonthlyPaymentWindow,
  } = useEventVariables();
  const {
    handleBudgetWindow,
    eventFinancialSubSection,
    handleEventFinancialSubSection,
  } = useMyEvent();

  const budget = useMemo(() => {
    return eventBudget && eventBudget.budget ? formatBrlCurrency(eventBudget.budget) : formatBrlCurrency(0);
  }, [eventBudget]);

  const totalExecutedValue = useMemo(() => {
    return formatBrlCurrency(eventTransactions
      .filter(
        ({ transaction }) => transaction.payer_id === selectedEvent.id
          && transaction.isPaid
          && !transaction.isCancelled
      )
      .map(({ transaction }) => Number(transaction.amount))
      .reduce((acc, cv) => acc + cv, 0));
  }, [eventTransactions]);

  const totalHiredValue = useMemo(() => {
    return formatBrlCurrency(eventTransactions
      .filter(
        ({ transaction }) => transaction.payer_id === selectedEvent.id
          && !transaction.isCancelled
      )
      .map(({ transaction }) => Number(transaction.amount))
      .reduce((acc, cv) => acc + cv, 0));
  }, [eventTransactions]);

  return (
    <Container>
      <TitleButton
        onPress={() => handleEventFinancialSubSection('Main')}
      >
        <Title>Financeiro</Title>
      </TitleButton>
      <SectionButton>
        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={() => handleEventFinancialSubSection('Main')}
          isActive={eventFinancialSubSection === 'Main'}
        >
          <MenuIcon
            name="home"
            isActive={eventFinancialSubSection === 'Main'}
          />
        </MenuButton>
        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={() => handleEventFinancialSubSection('TransactionAgreements')}
          isActive={eventFinancialSubSection === 'TransactionAgreements'}
        >
          <MenuIcon
            name="file-text"
            isActive={eventFinancialSubSection === 'TransactionAgreements'}
          />
        </MenuButton>
        <MenuButton
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={() => handleEventFinancialSubSection('Transactions')}
          isActive={eventFinancialSubSection === 'Transactions'}
        >
          <MenuIcon
            name="dollar-sign"
            isActive={eventFinancialSubSection === 'Transactions'}
          />
        </MenuButton>
      </SectionButton>
      <Body>
        {eventFinancialSubSection === 'TransactionAgreements' && (
          <EventTransactionAgreementFlatList
            transactionAgreements={eventTransactionAgreements}
          />
        )}
        {eventFinancialSubSection === 'Transactions' && (
          <EventTransactionSection />
        )}
        {eventFinancialSubSection === 'Main' && (
          <FirstSection>
            {selectedEvent.event_type === 'Prom' && (
              <MonthlyPaymentButton
                style={{
                  shadowColor,
                  shadowOffset,
                  shadowOpacity,
                  shadowRadius,
                  elevation: 5,
                }}
                onPress={handleMonthlyPaymentWindow}
              >
                <BudgetTitle>Mensalidades</BudgetTitle>
                <PercentageUnderline />
                <BudgetValue>
                  {formatBrlCurrency(monthlyPayments.totalPayed)} / {formatBrlCurrency(monthlyPayments.total)}
                </BudgetValue>
              </MonthlyPaymentButton>
            )}
            <EventBudgetButton />
            <Resume>
              <ResumeTitle>Valores Contratados:</ResumeTitle>
              <ResumeUnderline />
              <ResumeValue>{totalHiredValue}</ResumeValue>
            </Resume>
            <Resume>
              <ResumeTitle>Valores Executados:</ResumeTitle>
              <ResumeUnderline />
              <ResumeValue>{totalExecutedValue}</ResumeValue>
            </Resume>

          </FirstSection>
        )}
      </Body>
    </Container>
  );
}
