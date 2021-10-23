import React, { useState } from 'react';
import IParticipantDTO from '../../dtos/IParticipantDTO';
import theme from '../../global/styles/theme';
import { useEventVariables } from '../../hooks/eventVariables';
import InlineFormField from '../InlineFormField';

import {
  Container,
  Name,
  Title,
  NumberOfGuest,
} from './styles';

export interface IParticipantWithGuests extends IParticipantDTO {
  number_of_guests: number;
}

interface IProps {
  participant: IParticipantWithGuests;
  updateNumberOfGuests: (data: IParticipantWithGuests) => Promise<void>;
}

export function ParticipantNumberOfGuestsButton({
  participant,
  updateNumberOfGuests,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { isOwner } = useEventVariables();
  const [editNumberOfGuests, setEditNumerOfGuests] = useState(false);

  async function handleUpdateNumberOfGuests(data: string) {
    const numberOfGuests = Number(data);
    await updateNumberOfGuests({
      ...participant,
      number_of_guests: numberOfGuests,
    });
  }

  function handleEditNumberOfGuests() {
    isOwner && setEditNumerOfGuests(!editNumberOfGuests);
  }
  return (
    <>
      {!editNumberOfGuests ? (
        <Container
          style={{
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: 5,
          }}
          onPress={handleEditNumberOfGuests}
        >
          <Title>{participant.participant_name}</Title>
          <NumberOfGuest>{participant.number_of_guests}</NumberOfGuest>
        </Container>
      ) : (
        <>
          <Title>Editar número de convidados de</Title>
          <Name>{participant.participant_name}</Name>

          <InlineFormField
            defaultValue={String(participant.number_of_guests)}
            handleOnSubmit={handleUpdateNumberOfGuests}
            placeholder={String(participant.number_of_guests)}
            closeComponent={handleEditNumberOfGuests}
            keyboardType={"number-pad" || "numeric"}
          />
        </>
      )}
    </>
  );
}
