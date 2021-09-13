import React, { useState, useMemo } from 'react';
import { Note } from '../../../../../components/Note';
import { SectionHeader } from '../../../../../components/SectionHeader';
import INoteDTO from '../../../../../dtos/INoteDTO';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useNote } from '../../../../../hooks/notes';
import { EventNoteForm } from '../EventNoteForm';
import { SearchNotes } from '../SearchNotes';

import {
  Container,
  NotesContainer,
} from './styles';

export function EventNotesSection() {
  const { eventNotes } = useMyEvent();
  const { handleCreateEventNoteWindow, createEventNoteWindow } = useNote();

  const [filteredNotes, setFilteredNotes] = useState<INoteDTO[]>([]);
  const [search, setSearch] = useState(false);

  function handleSearch(): void {
    !search && createEventNoteWindow && handleCreateEventNoteWindow();
    setSearch(!search);
  }

  function handleNewNote(): void {
    setSearch(false);
    handleCreateEventNoteWindow();
  }

  function handleFilteredNotes(data: INoteDTO[]) {
    setFilteredNotes(data);
  }

  const notes = useMemo(() => {
    const onlyNotes = eventNotes
      .map(({ note }) => note)
      .sort((a, b) => {
        if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
        return 0;
      });
    setFilteredNotes(onlyNotes);
    return onlyNotes;
  }, [eventNotes]);

  return (
    <Container>
      <SectionHeader
        handleAddButton={handleNewNote}
        handleInfoButton={handleSearch}
        title="Notas"
        firstIcon="search"
      />
      {createEventNoteWindow && <EventNoteForm />}
      {search && (
        <SearchNotes
          handleNotes={(data: INoteDTO[]) => handleFilteredNotes(data)}
          notes={notes}
        />
      )}

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
