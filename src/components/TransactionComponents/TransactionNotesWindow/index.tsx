import React, { useState, useMemo } from 'react';
import { Note } from '../../Note';
import { NoteForm } from '../../NoteForm';
import WindowContainer from '../../WindowContainer';
import { WindowHeader } from '../../WindowHeader';
import INoteDTO from '../../../dtos/INoteDTO';
import { useTransaction } from '../../../hooks/transactions';
import { useMyEvent } from '../../../hooks/myEvent';
import { useNote } from '../../../hooks/notes';
import { SearchNotes } from '../../../modules/myEvents/components/EventNotesComponents/SearchNotes';

import {
  Container,
  NotesContainer,
} from './styles';

export function TransactionNotesWindow() {
  const { createTransactionNote, selectedTransactionNotes } = useNote();
  const {
    selectedEventTransaction,
    handleTransactionNotesWindow,
  } = useTransaction();

  const [filteredNotes, setFilteredNotes] = useState<INoteDTO[]>([]);

  function handleFilteredNotes(data: INoteDTO[]) {
    setFilteredNotes(data);
  }

  const notes = useMemo(() => {
    const onlyNotes = selectedTransactionNotes
      .map(({ note }) => note)
      .sort((a, b) => {
        if (new Date(a.updated_at) < new Date(b.updated_at)) return 1;
        if (new Date(a.updated_at) > new Date(b.updated_at)) return -1;
        return 0;
      });
    setFilteredNotes(onlyNotes);
    return onlyNotes;
  }, [selectedTransactionNotes]);

  async function handleNewTransactionNote(note: string) {
    await createTransactionNote({
      note,
      transaction_id: selectedEventTransaction.transaction.id,
    });
  }

  return (
    <WindowContainer
      closeWindow={handleTransactionNotesWindow}
      zIndex={55}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <WindowHeader
          overTitle={`Transação: ${selectedEventTransaction.transaction.name}`}
          title="Notas"
        />
        <SearchNotes
          handleNotes={(data: INoteDTO[]) => handleFilteredNotes(data)}
          notes={notes}
        />
        <NoteForm
          handleNote={(e: string) => handleNewTransactionNote(e)}
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
