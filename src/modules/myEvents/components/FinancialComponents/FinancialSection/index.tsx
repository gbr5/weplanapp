import React from 'react';
import { useEffect } from 'react';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';

import { useMyEvent } from '../../../../../hooks/myEvent';
import { useTransaction } from '../../../../../hooks/transactions';

import { formatBrlCurrency } from '../../../../../utils/formatBrlCurrency';

import { EventTransactionAgreementSection } from '../EventTransactionAgreementSection';

import {
  Container,
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
    totalEventCost,
  } = useMyEvent();
  const { eventTotalExecutedCredit, getAllEventTransactions } = useTransaction();

  useEffect(() => {
    getAllEventTransactions();
  }, [getAllEventTransactions]);

  return (
    <Container>
      <Title>Financeiro</Title>
      {eventFinancialSubSection === 'EventTransactionAgreementsSection' && (
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
            <ResumeValue>{formatBrlCurrency(eventTotalExecutedCredit)}</ResumeValue>
          </Resume>
          <SectionButton
            horizontal
          >
            <MenuButton>
              <ButtonTitle>Contratos</ButtonTitle>
              <MenuIcon name="file-text" />
            </MenuButton>
            <MenuButton>
              <ButtonTitle>Transações</ButtonTitle>
              <MenuIcon name="dollar-sign" />
            </MenuButton>
            <MenuButton>
              <ButtonTitle>Fornecedores</ButtonTitle>
              <MenuIcon name="play" />
            </MenuButton>
            <MenuButton>
              <ButtonTitle>Membros</ButtonTitle>
              <MenuIcon name="users" />
            </MenuButton>
          </SectionButton>
        </FirstSection>
      )}
    </Container>
  );
}
