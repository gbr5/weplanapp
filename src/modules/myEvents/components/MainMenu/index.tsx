import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useMyEvent } from '../../../../hooks/myEvent';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';

import {
  Container,
  MenuButton,
  MenuButtonText,
  MenuButtonNumber,
  BudgetInfo,
} from './styles';

export function MainMenu() {
  const {
    guests,
    confirmedGuests,
    hiredSuppliers,
    notHiredSuppliers,
    totalEventCost,
    currentSection,
    selectEventSection,
    eventTasks,
    handleBudgetWindow,
    eventBudget,
    selectedEvent,
    eventSuppliers,
    calculateTotalEventCost,
  } = useMyEvent();

  const guestsInfo = useMemo(() => `${confirmedGuests} / ${guests.length}`, [confirmedGuests, guests]);
  const budgetInfo = useMemo(() => {
    if (eventBudget && eventBudget.budget) {
      return formatBrlCurrency(eventBudget.budget);
    }
    return 'R$ 0,00';
  }, [eventBudget]);

  const suppliersInfo = useMemo(() => `${hiredSuppliers.length} / ${notHiredSuppliers.length + hiredSuppliers.length}`,
    [hiredSuppliers, notHiredSuppliers]);

  const financialInfo = useMemo(() => {
    if (eventBudget && eventBudget.budget) {
      return `${Math.round((totalEventCost / Number(eventBudget.budget)) * 100)} %`;
    }
    return '0 %';
  }, [totalEventCost, eventBudget]);

  const tasksInfo = useMemo(() => {
    if (eventTasks && eventTasks.length > 0) {
      const finnishedTasks = eventTasks.filter(task => task.status === 'finnished').length;
      return `${finnishedTasks} / ${eventTasks.length}`;
    }
  }, [eventTasks]);

  useEffect(() => {
    calculateTotalEventCost();
  }, [selectedEvent, eventSuppliers]);

  return (
    <Container horizontal>
      <MenuButton
        onPress={() => selectEventSection('Tasks')}
        isActive={currentSection === 'Tasks'}
      >
        <MenuButtonText
          isActive={currentSection === 'Tasks'}
        >
          Tarefas
        </MenuButtonText>
        <MenuButtonNumber
          isActive={currentSection === 'Tasks'}
        >
          {tasksInfo}
        </MenuButtonNumber>
      </MenuButton>
      <MenuButton
        onPress={() => selectEventSection('Guests')}
        isActive={currentSection === 'Guests'}
      >
        <MenuButtonText
          isActive={currentSection === 'Guests'}
        >
          Convidados
        </MenuButtonText>
        <MenuButtonNumber
          isActive={currentSection === 'Guests'}
        >
          {guestsInfo}
        </MenuButtonNumber>
      </MenuButton>
      <MenuButton
        onPress={handleBudgetWindow}
        isActive={false}
      >
        <MenuButtonText
          isActive={false}
        >
          Orçamento
        </MenuButtonText>
        <BudgetInfo>
          {budgetInfo}
        </BudgetInfo>
      </MenuButton>
      <MenuButton
        onPress={() => selectEventSection('Suppliers')}
        isActive={currentSection === 'Suppliers'}
      >
        <MenuButtonText
          isActive={currentSection === 'Suppliers'}
        >
          Fornecedores
        </MenuButtonText>
        <MenuButtonNumber
          isActive={currentSection === 'Suppliers'}
        >
          {suppliersInfo}
        </MenuButtonNumber>
      </MenuButton>
      <MenuButton
        onPress={() => selectEventSection('Financial')}
        isActive={currentSection === 'Financial'}
      >
        <MenuButtonText
          isActive={currentSection === 'Financial'}
        >
          Financeiro
        </MenuButtonText>
        <MenuButtonNumber
          isActive={currentSection === 'Financial'}
        >
          {financialInfo}
        </MenuButtonNumber>
      </MenuButton>
    </Container>
  );
};
