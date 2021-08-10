import React, { useState, useMemo } from 'react';
import { Note } from '../../../../../components/Note';
import { SectionHeader } from '../../../../../components/SectionHeader';
import INoteDTO from '../../../../../dtos/INoteDTO';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useNote } from '../../../../../hooks/notes';
import { SearchNotes } from '../SearchNotes';

import {
  Container,
  NotesContainer,
} from './styles';

export function EventNotesSection() {
  const { selectedEvent, handleSectionDescriptionWindow } = useMyEvent();
  const { handleCreateEventNoteWindow } = useNote();

  const [filteredNotes, setFilteredNotes] = useState<INoteDTO[]>([]);

  function handleFilteredNotes(data: INoteDTO[]) {
    setFilteredNotes(data);
  }

  const notes = useMemo(() => {
    const onlyNotes = selectedEvent.notes
      .map(({ note }) => note)
      .sort((a, b) => {
        if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
        return 0;
      });
    setFilteredNotes(onlyNotes);
    return onlyNotes;
  }, [selectedEvent.notes]);

  return (
    <Container>
      <SectionHeader
        handleAddButton={handleCreateEventNoteWindow}
        handleInfoButton={handleSectionDescriptionWindow}
        title="Notas"
      />
      <SearchNotes
        handleNotes={(data: INoteDTO[]) => handleFilteredNotes(data)}
        notes={notes}
      />

      {filteredNotes.length > 0 && (
        <NotesContainer
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Note key={item.id} selectedNote={item} />
          )}
        />
      )}
    </Container>
  );
}
