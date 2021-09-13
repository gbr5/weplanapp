import React from 'react';
import CloseButton from '../../../../../components/CloseButton';
import { NoteForm } from '../../../../../components/NoteForm';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useNote } from '../../../../../hooks/notes';

import { Container } from './styles';

export function EventNoteForm() {
  const { selectedEvent } = useMyEvent();
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
