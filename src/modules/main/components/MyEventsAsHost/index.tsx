import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useEvent } from '../../../../hooks/event';
import { EventButton } from '../EventButton';
import ISectionProps from '../../../../dtos/ISectionProps';
import theme from '../../../../global/styles/theme';

import {
  Container,
  SectionButton,
  Label,
  LabelUnderline,
  EventContainer,
} from './styles';

interface IProps {
  handleSection: (section: ISectionProps) => void;
  selectedSection: string;
}

const MyEventsAsHost: React.FC<IProps> = ({
  handleSection,
  selectedSection,
}: IProps) => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { eventsAsOwner } = useEvent();

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
      {selectedSection === 'host' ? (
        <SectionButton onPress={() => handleSection({ section: '' })}>
          <Label>Eventos como Anfitrião</Label>
          <Feather name="chevron-up" size={24} />
        </SectionButton>
      ) : (
        <SectionButton onPress={() => handleSection({ section: 'host' })}>
          <Label>Eventos como Anfitrião</Label>
          <Feather name="chevron-down" size={24} />
        </SectionButton>
      )}
      <LabelUnderline />
      {selectedSection === 'host'
        && eventsAsOwner
        && eventsAsOwner.length > 0
        && (
          <EventContainer
            data={eventsAsOwner}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventButton
                key={item.id}
                event={item.event}
              />
            )}
          />
        )}
    </Container>
  );
};

export default MyEventsAsHost;
