import React, { useMemo, useState, useEffect } from 'react';
import { Platform } from 'react-native';

import theme from '../../../../global/styles/theme';
import { useEventVariables } from '../../../../hooks/eventVariables';

import { useMyEvent } from '../../../../hooks/myEvent';
import { useTransaction } from '../../../../hooks/transactions';

import {
  Container,
  MenuButton,
  MenuButtonText,
  MenuButtonNumber,
  Icon,
} from './styles';

export function MainMenu() {
  const {
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.menuShadow;
  const {
    confirmedGuests,
    hiredSuppliers,
    notHiredSuppliers,
    currentSection,
    selectEventSection,
  } = useMyEvent();
  const {
    eventGuests,
    selectedEvent,
    eventMembers,
    eventOwners,
    eventNotes,
    eventTasks,
    eventBudget,
    eventTransactions,
  } = useEventVariables();

  const [suppliersInfo, setSuppliersInfo] = useState('');

  useEffect(() => {
    setSuppliersInfo(`${hiredSuppliers.length} / ${notHiredSuppliers.length + hiredSuppliers.length}`)
  }, [hiredSuppliers.length, notHiredSuppliers.length]);

  const notesInfo = useMemo(() => `${eventNotes.length}`, [eventNotes]);
  const guestsInfo = useMemo(() => `${confirmedGuests} / ${eventGuests.length}`, [confirmedGuests, eventGuests]);
  const membersInfo = useMemo(() => `${eventMembers.length}`, [eventMembers]);
  const ownersInfo = useMemo(() => `${eventOwners.length}`, [eventOwners]);

  const financialInfo = useMemo(() => {
    if (eventBudget && eventBudget.budget) {
      const hiredValue = eventTransactions
        .filter(({ transaction }) => transaction.payer_id === selectedEvent.id && !transaction.isCancelled)
        .map(({ transaction }) => Number(transaction.amount))
        .reduce((acc, cv) => acc + cv, 0);

      return `${Math.round(hiredValue / Number(eventBudget.budget) * 100)} %`;
    }
    return '0 %';
  }, [eventTransactions, eventBudget]);

  const tasksInfo = useMemo(() => {
    if (eventTasks && eventTasks.length > 0) {
      const finnishedTasks = eventTasks.filter(task => task.task.status === 'finnished').length;
      return finnishedTasks &&
        eventTasks && eventTasks.length > 0
          ? `${finnishedTasks} / ${eventTasks.length}`
          : '0 / 0';
    }
  }, [eventTasks]);

  const elevation = 15;
  const shadowColor = Platform.OS === 'ios' ? theme.color.secondary : 'black';

  return (
    <Container horizontal>
      <MenuButton
        style={currentSection !== 'Dashboard' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation,
        }}
        onPress={() => selectEventSection('Dashboard')}
        isActive={currentSection === 'Dashboard'}
      >
        <MenuButtonText
          isActive={currentSection === 'Dashboard'}
        >
          Home
        </MenuButtonText>
        <Icon name="home" />
        {/* <MenuButtonNumber
          isActive={currentSection === 'Dashboard'}
        >
          {notesInfo}
        </MenuButtonNumber> */}
      </MenuButton>
      <MenuButton
        style={currentSection !== 'Notes' && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation,
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
          elevation,
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
          elevation,
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
          elevation,
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
          elevation,
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
          elevation,
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
            elevation,
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
