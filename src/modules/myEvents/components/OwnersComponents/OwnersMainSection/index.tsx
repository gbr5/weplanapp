import React, { useMemo, useState } from 'react';
import { CheckBoxButton } from '../../../../../components/CheckBoxButton';
import { EventNumberOfGuestsButton } from '../../../../../components/EventNumberOfGuestsButton';
import { EventRestrictedNumberOfGuestQuestion } from '../../../../../components/EventRestrictedNumberOfGuestQuestion';
import { IParticipantWithGuests, ParticipantNumberOfGuestsButton } from '../../../../../components/ParticipantNumberOfGuestsButton';
import { useEventOwners } from '../../../../../hooks/eventOwners';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useMyEvent } from '../../../../../hooks/myEvent';

import {
  Container,
  Body,
  ParticipantsContainer,
  SubContainer,
  Title,
} from './styles';

export function OwnersMainSection() {
  const { editEvent } = useMyEvent();
  const { editEventOwner } = useEventOwners();
  const {
    selectedEvent,
    eventOwners,
  } = useEventVariables();

  const [loading, setLoading] = useState(false);

  const participants = useMemo(() => {
    return eventOwners.map(owner => {
      return {
        participant_id: owner.id,
        participant_name: owner.userEventOwner.name,
        participant_type: 'owner',
        number_of_guests: owner.number_of_guests,
      };
    });
  }, [eventOwners]);
  async function updateOwnerNumberOfGuests({
    number_of_guests,
    participant_id
  }: IParticipantWithGuests) {
    try {
      setLoading(true);
      const selectedEventOwner = eventOwners.find(member => member.id === participant_id)
      if (selectedEventOwner) {
        await editEventOwner({
          ...selectedEventOwner,
          number_of_guests,
        });
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSetEventNumberOfGuests() {
    try {
      setLoading(true);
      await editEvent({
        ...selectedEvent,
        isNumberOfGuestsRestricted: !selectedEvent.isNumberOfGuestsRestricted,
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Body>
        <EventRestrictedNumberOfGuestQuestion />

        {selectedEvent.isNumberOfGuestsRestricted &&
          participants.length > 0 && (
            <>
              <EventNumberOfGuestsButton />
              <Title>Nº de convidados por anfitrião</Title>
              <ParticipantsContainer
                data={participants}
                keyExtractor={(item) => item.participant_id}
                renderItem={({ item }) => {
                  return (
                    <ParticipantNumberOfGuestsButton
                      participant={item}
                      updateNumberOfGuests={updateOwnerNumberOfGuests}
                    />
                  );
                }}
              />
            </>
          )}
      </Body>
    </Container>
  );
}
