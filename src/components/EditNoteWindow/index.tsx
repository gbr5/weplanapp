import React from 'react';
import INoteDTO from '../../dtos/INoteDTO';
import { useMyEvent } from '../../hooks/myEvent';
import { useNote } from '../../hooks/notes';
import { NoteForm } from '../NoteForm';
import WindowContainer from '../WindowContainer';

import {
  Container,
  Title,
} from './styles';

interface IProps {
  closeWindow: () => void;
}

export function EditNoteWindow({
  closeWindow,
}: IProps) {
  const { getEventTasks, selectedEvent } = useMyEvent();
  const { editNote, selectedNote, handleEditNoteWindow } = useNote();

  async function handleEditNote(note: string) {
    if (note !== '') {
      await editNote({
        ...selectedNote,
        note,
      });
      await getEventTasks(selectedEvent.id);
      handleEditNoteWindow();
    }
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={25}
      top="5%"
      left="0%"
      height="50%"
      width="100%"
      backdropZIndex={24}
    >
      <Container>
        <Title>Atualizar nota</Title>
        <NoteForm
          handleNote={(note: string) => handleEditNote(note)}
          placeholder={selectedNote.note}
        />
      </Container>
    </WindowContainer>
  );
};
