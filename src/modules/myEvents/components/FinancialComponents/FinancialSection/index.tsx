import React from 'react';
import { useEffect } from 'react';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { EventTransactionAgreementSection } from '../EventTransactionAgreementSection';

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
    <Container>
      <TitleButton
        onPress={() => handleEventFinancialSubSection('Main')}
      >
        <Title>Financeiro</Title>
      </TitleButton>
      {eventFinancialSubSection === 'TransactionAgreements' && (
        <EventTransactionAgreementSection />
      )}
      {eventFinancialSubSection === 'Main' && (
        <FirstSection>
          <BudgetSection
            onPress={handleBudgetWindow}
          >
            <BudgetTitle>Orçamento</BudgetTitle>
            <PercentageUnderline />
            <BudgetValue>
              {eventBudget && eventBudget.id
                ? formatBrlCurrency(eventBudget.budget)
                : formatBrlCurrency(0)
              }
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
      <SectionButton
        horizontal
      >
        <MenuButton
          onPress={() => handleEventFinancialSubSection('Main')}
        >
          <ButtonTitle>
            Principal
          </ButtonTitle>
          <MenuIcon name="home" />
        </MenuButton>
        <MenuButton
          onPress={() => handleEventFinancialSubSection('TransactionAgreements')}
        >
          <ButtonTitle>
            Contratos
          </ButtonTitle>
          <MenuIcon name="file-text" />
        </MenuButton>
        <MenuButton
          onPress={() => handleEventFinancialSubSection('Transactions')}
        >
          <ButtonTitle>
            Transações
          </ButtonTitle>
          <MenuIcon name="dollar-sign" />
        </MenuButton>
        <MenuButton
          onPress={() => handleEventFinancialSubSection('Suppliers')}
        >
          <ButtonTitle>
            Fornecedores
          </ButtonTitle>
          <MenuIcon name="play" />
        </MenuButton>
        <MenuButton
          onPress={() => handleEventFinancialSubSection('Members')}
        >
          <ButtonTitle>
            Membros
          </ButtonTitle>
          <MenuIcon name="users" />
        </MenuButton>
      </SectionButton>
    </Container>
  );
}
