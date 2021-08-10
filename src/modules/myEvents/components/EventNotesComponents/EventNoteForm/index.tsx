import React from 'react';
import { NoteForm } from '../../../../../components/NoteForm';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useNote } from '../../../../../hooks/notes';

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
    <WindowContainer
      closeWindow={handleCreateEventNoteWindow}
      zIndex={15}
      top="5%"
      left="0%"
      height="40%"
      width="100%"
    >
      <WindowHeader title="Nova Nota do Evento" />

      <NoteForm
        handleNote={(data: string) => handleNewNote(data)}
        placeholder="Nova Nota"
      />
    </WindowContainer>
  );
}
