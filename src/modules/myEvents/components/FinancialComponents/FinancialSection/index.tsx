import React, { useEffect } from 'react';
import theme from '../../../../../global/styles/theme';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { EventSupplierTransactionAgreementsSection } from '../EventSupplierTransactionAgreementsSection';
import { EventTransactionSection } from '../EventTransactionSection';

import {
  Container,
  TitleButton,
  Title,
  FirstSection,
  BudgetSection,
  BudgetTitle,
  BudgetValue,
  Resume,
  ResumeUnderline,
  PercentageUnderline,
  ResumeTitle,
  ResumeValue,
  SectionButton,
  MenuButton,
  ButtonTitle,
  MenuIcon,
} from './styles';

export function FinancialSection() {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.iconButtonShadow;
  const {
    eventBudget,
    handleBudgetWindow,
    eventFinancialSubSection,
    handleEventFinancialSubSection,
    totalEventCost,
  } = useMyEvent();
  const { eventTotalExecutedDebit, getAllEventTransactions } = useTransaction();

  useEffect(() => {
    getAllEventTransactions();
  }, [getAllEventTransactions]);

  return (
    <>
      <Container>
        <TitleButton
          onPress={() => handleEventFinancialSubSection('Main')}
        >
          <Title>Financeiro</Title>
        </TitleButton>
        {eventFinancialSubSection === 'TransactionAgreements' && (
          <EventSupplierTransactionAgreementsSection />
        )}
        {eventFinancialSubSection === 'Transactions' && (
          <EventTransactionSection />
        )}
        {eventFinancialSubSection === 'Main' && (
          <FirstSection>
            <BudgetSection
              style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
              }}
              onPress={handleBudgetWindow}
            >
              <BudgetTitle>Orçamento</BudgetTitle>
              <PercentageUnderline />
              <BudgetValue>
                {eventBudget}
              </BudgetValue>
            </BudgetSection>
            <Resume>
              <ResumeTitle>Valores Contratados:</ResumeTitle>
              <ResumeUnderline />
              <ResumeValue>{formatBrlCurrency(totalEventCost)}</ResumeValue>
            </Resume>
            <Resume>
              <ResumeTitle>Valores Executados:</ResumeTitle>
              <ResumeUnderline />
              <ResumeValue>{formatBrlCurrency(eventTotalExecutedDebit)}</ResumeValue>
            </Resume>

          </FirstSection>
        )}
        <SectionButton>
          <MenuButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
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
      </Container>
    </>
  );
}
