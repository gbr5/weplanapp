import React, { useState, useMemo } from 'react';
import { Note } from '../../../../../components/Note';
import { NoteForm } from '../../../../../components/NoteForm';
import { SectionHeader } from '../../../../../components/SectionHeader';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import INoteDTO from '../../../../../dtos/INoteDTO';
import { useEventSuppliers } from '../../../../../hooks/eventSuppliers';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useNote } from '../../../../../hooks/notes';
import { SearchNotes } from '../../EventNotesComponents/SearchNotes';

import {
  Container,
  NotesContainer,
} from './styles';

export function SupplierNotesSection() {
  const { selectedSupplier } = useMyEvent();
  const { handleSupplierNotesWindow } = useEventSuppliers();
  const { createEventSupplierNote } = useNote();

  const [filteredNotes, setFilteredNotes] = useState<INoteDTO[]>([]);

  function handleFilteredNotes(data: INoteDTO[]) {
    setFilteredNotes(data);
  }

  const notes = useMemo(() => {
    const onlyNotes = selectedSupplier.notes
      .map(({ note }) => note)
      .sort((a, b) => {
        if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
        return 0;
      });
    setFilteredNotes(onlyNotes);
    return onlyNotes;
  }, [selectedSupplier.notes]);

  async function handleNewSupplierNote(note: string) {
    await createEventSupplierNote({
      note,
      supplier_id: selectedSupplier.id,
    });
  }

  return (
    <WindowContainer
      closeWindow={handleSupplierNotesWindow}
      zIndex={15}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <WindowHeader
          overTitle={`Fornecedor: ${selectedSupplier.name}`}
          title="Notas"
        />
        <SearchNotes
          handleNotes={(data: INoteDTO[]) => handleFilteredNotes(data)}
          notes={notes}
        />
        <NoteForm
          handleNote={(e: string) => handleNewSupplierNote(e)}
          placeholder="Nova nota"
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
    </WindowContainer>
  );
}
