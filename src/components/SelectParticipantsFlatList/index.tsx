import React from 'react';
import { useEventVariables } from '../../hooks/eventVariables';
import { SelectParticipantButton } from '../SelectParticipantButton';

import { Container } from './styles';

export function SelectParticipantsFlatList() {
  const { participants } = useEventVariables();
  return (
    <Container
      data={participants}
      keyExtractor={(item) => item.participant_id}
      renderItem={({ item }) => (
        <SelectParticipantButton
          participant={item}
        />
      )}
    />
  );
}
