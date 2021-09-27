import React from 'react';

import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useNote } from '../../../../../hooks/notes';

import CloseButton from '../../../../../components/CloseButton';
import { NoteForm } from '../../../../../components/NoteForm';

import { Container } from './styles';

export function EventNoteForm() {
  const { selectedEvent } = useEventVariables();
  const {
    handleCreateEventNoteWindow,
    createEventNote,
  } = useNote();

  async function handleNewNote(note: string) {
    await createEventNote({
      event_id: selectedEvent.id,
      note,
    });
    handleCreateEventNoteWindow();
  }
  return (
    <Container>
      <CloseButton closeFunction={handleCreateEventNoteWindow} />
      <NoteForm
        handleNote={(data: string) => handleNewNote(data)}
        placeholder="Nova Nota"
      />
    </Container>
  );
}
