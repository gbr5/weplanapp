import React, { useMemo } from 'react';
import Feather from 'react-native-vector-icons/Feather';

import theme from '../../global/styles/theme';

import {
  Container,
  Name,
  FriendButton,
  Label,
} from './styles';
import IParticipantDTO from '../../dtos/IParticipantDTO';
import { useEventVariables } from '../../hooks/eventVariables';

interface IProps {
  participant: IParticipantDTO;
}

export function SelectParticipantButton({ participant }: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const iconSize = 24;
  const {
    selectedParticipants,
    handleSelectedParticipants,
  } = useEventVariables();

  const isSelected = useMemo(() => {
    const findSelected = selectedParticipants.find(item => item.participant_id === participant.participant_id);
    return !!findSelected;
  }, [selectedParticipants, participant]);

  function handleSelected() {
    if (isSelected) {
      const newParticipants = selectedParticipants.filter(item => item.participant_id !== participant.participant_id);
      handleSelectedParticipants(newParticipants);
    } else {
      handleSelectedParticipants([
        ...selectedParticipants,
        participant,
      ]);
    }
  }

  const participantType = useMemo(() => {
    if (participant.participant_type === 'member') return 'Membro';
    if (participant.participant_type === 'supplier') return 'Fornecedor';
    if (participant.participant_type === 'guest') return 'Convidado';
    return 'Anfitrião';
  }, [participant]);

  return (
    <Container
      isSelected={isSelected}
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      onPress={handleSelected}
    >
      <Label>{participantType}</Label>
      <Name>{participant.participant_name}</Name>
      <FriendButton
        onPress={handleSelected}
        isSelected={isSelected}
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
      >
        {isSelected ? (
          <Feather size={iconSize} name="check-square" />
        ) : (
          <Feather size={iconSize} name="square" />
        )}
      </FriendButton>
    </Container>
  );
}
