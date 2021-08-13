import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useEvent } from '../../../../hooks/event';
import { EventButton } from '../EventButton';
import ISectionProps from '../../../../dtos/ISectionProps';

import {
  Container,
  SectionButton,
  Label,
  LabelUnderline,
  EventContainer,
} from './styles';
import theme from '../../../../global/styles/theme';

interface IProps {
  handleSection: (section: ISectionProps) => void;
  selectedSection: string;
}

const MyEventsAsMember: React.FC<IProps> = ({
  handleSection,
  selectedSection,
}) => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { eventsAsMember } = useEvent();

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
      {selectedSection === 'member' ? (
        <SectionButton onPress={() => handleSection({ section: '' })}>
          <Label>Eventos como Membro</Label>
          <Feather name="chevron-up" size={24} />
        </SectionButton>
      ) : (
        <SectionButton onPress={() => handleSection({ section: 'member' })}>
          <Label>Eventos como Membro</Label>
          <Feather name="chevron-down" size={24} />
        </SectionButton>
      )}
      <LabelUnderline />
      {
        eventsAsMember
        && selectedSection === 'member'
        && eventsAsMember.length > 0 && (
          <EventContainer
            data={eventsAsMember}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventButton
                key={item.id}
                event={item.event}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
    </Container>
  );
};

export default MyEventsAsMember;
