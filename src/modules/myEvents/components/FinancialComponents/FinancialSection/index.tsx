import React, { useEffect } from 'react';

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
        <SectionButton
          horizontal
        >
          <MenuButton
            onPress={() => handleEventFinancialSubSection('Main')}
            isActive={eventFinancialSubSection === 'Main'}
          >
            <ButtonTitle
              isActive={eventFinancialSubSection === 'Main'}
            >
              Principal
            </ButtonTitle>
            <MenuIcon
              name="home"
              isActive={eventFinancialSubSection === 'Main'}
            />
          </MenuButton>
          <MenuButton
            onPress={() => handleEventFinancialSubSection('TransactionAgreements')}
            isActive={eventFinancialSubSection === 'TransactionAgreements'}
          >
            <ButtonTitle
              isActive={eventFinancialSubSection === 'TransactionAgreements'}
            >
              Contratos
            </ButtonTitle>
            <MenuIcon
              name="file-text"
              isActive={eventFinancialSubSection === 'TransactionAgreements'}
            />
          </MenuButton>
          <MenuButton
            onPress={() => handleEventFinancialSubSection('Transactions')}
            isActive={eventFinancialSubSection === 'Transactions'}
          >
            <ButtonTitle
              isActive={eventFinancialSubSection === 'Transactions'}
            >
              Transações
            </ButtonTitle>
            <MenuIcon
              name="dollar-sign"
              isActive={eventFinancialSubSection === 'Transactions'}
            />
          </MenuButton>
          {/* <MenuButton
            onPress={() => handleEventFinancialSubSection('Suppliers')}
            isActive={eventFinancialSubSection === 'Suppliers'}
          >
            <ButtonTitle
              isActive={eventFinancialSubSection === 'Suppliers'}
            >
              Fornecedores
            </ButtonTitle>
            <MenuIcon
              name="play"
              isActive={eventFinancialSubSection === 'Suppliers'}
            />
          </MenuButton> */}
          {/* <MenuButton
            onPress={() => handleEventFinancialSubSection('Members')}
            isActive={eventFinancialSubSection === 'Members'}
          >
            <ButtonTitle
              isActive={eventFinancialSubSection === 'Members'}
            >
              Membros
            </ButtonTitle>
            <MenuIcon
              name="users"
              isActive={eventFinancialSubSection === 'Members'}
            />
          </MenuButton> */}
        </SectionButton>
      </Container>
    </>
  );
}
