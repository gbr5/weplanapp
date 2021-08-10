import React, { useMemo, useState, useEffect } from 'react';
import theme from '../../../../global/styles/theme';

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
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.menuShadow;
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

  const notesInfo = useMemo(() => `${selectedEvent.notes.length}`, [selectedEvent.notes]);
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
        style={currentSection !== 'Notes' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
        onPress={() => selectEventSection('Notes')}
        isActive={currentSection === 'Notes'}
      >
        <MenuButtonText
          isActive={currentSection === 'Notes'}
        >
          Notas
        </MenuButtonText>
        <MenuButtonNumber
          isActive={currentSection === 'Notes'}
        >
          {notesInfo}
        </MenuButtonNumber>
      </MenuButton>
      <MenuButton
        style={currentSection !== 'Tasks' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
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
        style={currentSection !== 'Guests' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
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
        style={currentSection !== 'Suppliers' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
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
        style={currentSection !== 'Financial' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
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
        style={currentSection !== 'Owners' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
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
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
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
