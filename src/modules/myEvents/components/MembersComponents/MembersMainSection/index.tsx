import React, { useMemo, useState } from 'react';
import { EventMembersNumberOfGuestsButton } from '../../../../../components/EventMembersNumberOfGuestsButton';
import { EventRestrictedNumberOfGuestQuestion } from '../../../../../components/EventRestrictedNumberOfGuestQuestion';
import { IParticipantWithGuests, ParticipantNumberOfGuestsButton } from '../../../../../components/ParticipantNumberOfGuestsButton';
import { useEventMembers } from '../../../../../hooks/eventMembers';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useMyEvent } from '../../../../../hooks/myEvent';

import {
  Container,
  Body,
  ParticipantsContainer,
  SubContainer,
  Title,
} from './styles';

export function MembersMainSection() {
  const { editEvent } = useMyEvent();
  const {
    editEventMember,
  } = useEventMembers();
  const {
    selectedEvent,
    eventMembers,
  } = useEventVariables();

  const [loading, setLoading] = useState(false);

  const participants = useMemo(() => {
    return eventMembers.map(member => {
      return {
        participant_id: member.id,
        participant_name: member.userEventMember.name,
        participant_type: 'member',
        number_of_guests: member.number_of_guests,
      };
    });
  }, [eventMembers]);

  async function updateMemberNumberOfGuests({
    number_of_guests,
    participant_id
  }: IParticipantWithGuests) {
    try {
      setLoading(true);
      const selectedEventMember = eventMembers.find(member => member.id === participant_id)
      if (selectedEventMember) {
        await editEventMember({
          ...selectedEventMember,
          number_of_guests,
        });
      }
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
              <EventMembersNumberOfGuestsButton />
              <Title>Nº de convidados por membro</Title>
              <ParticipantsContainer
                data={participants}
                keyExtractor={(item) => item.participant_id}
                renderItem={({ item }) => {
                  return (
                    <ParticipantNumberOfGuestsButton
                      participant={item}
                      updateNumberOfGuests={updateMemberNumberOfGuests}
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
