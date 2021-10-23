import React, { useMemo } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useEvent } from '../../../../hooks/event';
import theme from '../../../../global/styles/theme';
import { EventOwnerFlatList } from '../EventOwnerFlatList';
import { EventMemberFlatList } from '../EventMemberFlatList';
import { EventGuestFlatList } from '../EventGuestFlatList';

import {
  Container,
  SectionButton,
  Label,
  LabelUnderline,
} from './styles';

interface IProps {
  thisSection: 'host' | 'member' | 'guest';
}

export function MyEventsAs({
  thisSection,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const {
    eventsAsOwner,
    eventsAsMember,
    eventsAsGuest,
    selectedEventSection,
    handleSelectedEventSection,
  } = useEvent();

  const section = useMemo(() => {
    if (thisSection === 'member') {
      return {
        events: eventsAsMember,
        name: 'Membro',
      };
    }
    if (thisSection === 'guest') {
      return {
        events: eventsAsGuest,
        name: 'Convidado',
      };
    }
    return {
      events: eventsAsOwner,
      name: 'Anfitrião',
    };
  }, []);

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 20,
      }}
    >
      <SectionButton onPress={() => handleSelectedEventSection(thisSection)}>
        <Label>Eventos como {section.name}</Label>
        {selectedEventSection === thisSection ? (
          <Feather name="chevron-up" size={24} />
        ) : (
          <Feather name="chevron-down" size={24} />
        )}
      </SectionButton>
      <LabelUnderline />
      {selectedEventSection === thisSection
        && thisSection === 'host' && (
          <EventOwnerFlatList />
        )}
      {selectedEventSection === thisSection
        && thisSection === 'member' && (
          <EventMemberFlatList />
        )}
      {selectedEventSection === thisSection
        && thisSection === 'guest' && (
          <EventGuestFlatList />
        )}
      {selectedEventSection === thisSection
        && section.events.length < 0 && (
          <Label>Você ainda não possui como {section.name}</Label>
        )}
    </Container>
  );
};
