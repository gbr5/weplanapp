import React, { useMemo } from 'react';
import { useMyEvent } from '../../../../hooks/myEvent';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';

import {
  Container,
  MenuButton,
  MenuButtonText,
  MenuButtonNumber,
  BudgetInfo,
} from './styles';

const MainMenu: React.FC = () => {
  const {
    guests,
    confirmedGuests,
    eventInfo,
    hiredSuppliers,
    notHiredSuppliers,
    totalEventCost,
    currentSection,
    selectEventSection,
    eventTasks,
    handleBudgetWindow,
    eventBudget,
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
    if (eventInfo && eventInfo.budget) {
      return `${Math.round((totalEventCost / eventInfo.budget)) * 100} %`;
    }
    return '0 %';
  }, [totalEventCost, eventInfo]);

  const tasksInfo = useMemo(() => {
    if (eventTasks && eventTasks.length > 0) {
      const finnishedTasks = eventTasks.filter(task => task.status === 'finnished').length;
      return `${finnishedTasks} / ${eventTasks.length}`;
    }
  }, [eventTasks]);

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

export default MainMenu;
