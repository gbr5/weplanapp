import React, { useMemo, useState } from 'react';
import { useCallback } from 'react';
import { useMyEvent } from '../../../../hooks/myEvent';
import { formatBrlCurrency } from '../../../../utils/formatBrlCurrency';

import {
  Container,
  MenuButton,
  MenuButtonText,
  MenuButtonNumber,
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
  } = useMyEvent();

  const guestsInfo = useMemo(() => `${confirmedGuests} / ${guests.length}`, [confirmedGuests, guests]);
  const budgetInfo = useMemo(() => {
    if (eventInfo && eventInfo.budget) {
      return formatBrlCurrency(eventInfo.budget);
    }
    return 'R$ 0,00';
  }, [eventInfo]);

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
      <MenuButton onPress={() => selectEventSection('Tasks')} isActive={currentSection === 'Tasks'}>
        <MenuButtonText isActive={currentSection === 'Tasks'}>Tarefas</MenuButtonText>
        <MenuButtonNumber isActive={currentSection === 'Tasks'}>{tasksInfo}</MenuButtonNumber>
      </MenuButton>
      <MenuButton onPress={() => selectEventSection('Guests')} isActive={currentSection === 'Guests'}>
        <MenuButtonText isActive={currentSection === 'Guests'}>Convidados</MenuButtonText>
        <MenuButtonNumber isActive={currentSection === 'Guests'}>{guestsInfo}</MenuButtonNumber>
      </MenuButton>
      <MenuButton onPress={() => selectEventSection('Budget')} isActive={currentSection === 'Budget'}>
        <MenuButtonText isActive={currentSection === 'Budget'}>Orçamento</MenuButtonText>
        <MenuButtonNumber isActive={currentSection === 'Budget'}>{budgetInfo}</MenuButtonNumber>
      </MenuButton>
      <MenuButton onPress={() => selectEventSection('Suppliers')} isActive={currentSection === 'Suppliers'}>
        <MenuButtonText isActive={currentSection === 'Suppliers'}>Fornecedores</MenuButtonText>
        <MenuButtonNumber isActive={currentSection === 'Suppliers'}>{suppliersInfo}</MenuButtonNumber>
      </MenuButton>
      <MenuButton onPress={() => selectEventSection('Financial')} isActive={currentSection === 'Financial'}>
        <MenuButtonText isActive={currentSection === 'Financial'}>Financeiro</MenuButtonText>
        <MenuButtonNumber isActive={currentSection === 'Financial'}>{financialInfo}</MenuButtonNumber>
      </MenuButton>
    </Container>
  );
};

export default MainMenu;
