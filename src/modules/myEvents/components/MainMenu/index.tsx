import React, { useMemo, useState, useEffect } from 'react';

import { useMyEvent } from '../../../../hooks/myEvent';
import { useTransaction } from '../../../../hooks/transactions';

import {
  Container,
  MenuButton,
  MenuButtonText,
  MenuButtonNumber,
} from './styles';

export function MainMenu() {
  const {
    guests,
    confirmedGuests,
    hiredSuppliers,
    notHiredSuppliers,
    currentSection,
    selectEventSection,
    selectedEvent,
    members,
    owners,
  } = useMyEvent();
  const { eventTotalDebit } = useTransaction();

  const [suppliersInfo, setSuppliersInfo] = useState('');

  useEffect(() => {
    setSuppliersInfo(`${hiredSuppliers.length} / ${notHiredSuppliers.length + hiredSuppliers.length}`)
  }, [hiredSuppliers.length, notHiredSuppliers.length]);

  const guestsInfo = useMemo(() => `${confirmedGuests} / ${guests.length}`, [confirmedGuests, guests]);
  const membersInfo = useMemo(() => `${members.length}`, [members]);
  const ownersInfo = useMemo(() => `${owners.length}`, [owners]);

  const financialInfo = useMemo(() => {
    if (selectedEvent.eventBudget && selectedEvent.eventBudget.budget) {
      return `${Math.round((eventTotalDebit / Number(selectedEvent.eventBudget.budget)) * 100)} %`;
    }
    return '0 %';
  }, [eventTotalDebit, selectedEvent.eventBudget]);

  const tasksInfo = useMemo(() => {
    if (selectedEvent.eventTasks && selectedEvent.eventTasks.length > 0) {
      const finnishedTasks = selectedEvent.eventTasks.filter(task => task.status === 'finnished').length;
      return `${finnishedTasks} / ${selectedEvent.eventTasks.length}`;
    }
  }, [selectedEvent.eventTasks]);

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
      <MenuButton
        onPress={() => selectEventSection('Owners')}
        isActive={currentSection === 'Owners'}
      >
        <MenuButtonText
          isActive={currentSection === 'Owners'}
        >
          Anfitriões
        </MenuButtonText>
        <MenuButtonNumber
          isActive={currentSection === 'Owners'}
        >
          {ownersInfo}
        </MenuButtonNumber>
      </MenuButton>
      {selectedEvent.event_type === 'Prom' && (
        <MenuButton
          onPress={() => selectEventSection('Members')}
          isActive={currentSection === 'Members'}
        >
          <MenuButtonText
            isActive={currentSection === 'Members'}
          >
            Membros
          </MenuButtonText>
          <MenuButtonNumber
            isActive={currentSection === 'Members'}
          >
            {membersInfo}
          </MenuButtonNumber>
        </MenuButton>
      )}
    </Container>
  );
};
