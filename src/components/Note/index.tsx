import React, { useState, useEffect } from 'react';
import INoteDTO from '../../dtos/INoteDTO';
import IUserDTO from '../../dtos/IUserDTO';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';
import { useNote } from '../../hooks/notes';
import formatDateToString from '../../utils/formatDateToString';

import {
  Container,
  EditNoteButton,
  EditNoteIcon,
  NoteAuthor,
  NoteDate,
  NoteFooter,
  TextNote,
} from './styles';

interface IProps {
  selectedNote: INoteDTO;
}

export function Note({
  selectedNote,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { getUser, user } = useAuth();
  const { handleEditNoteWindow, selectNote } = useNote();

  const [author, setAuthor] = useState({} as IUserDTO);

  function handleEditNote() {
    selectNote(selectedNote);
    handleEditNoteWindow();
  }

  async function getAuthor() {
    user.id === selectedNote.author_id && setAuthor(user);
    const findAuthor = await getUser(selectedNote.author_id);
    if (findAuthor) return findAuthor;
  }

  useEffect(() => {
    getAuthor();
  }, []);

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
    >
      <TextNote>{selectedNote.note}</TextNote>
      <EditNoteButton
        onPress={handleEditNote}
        style={{
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
        }}
      >
        <EditNoteIcon name="edit-2" />
      </EditNoteButton>
      <NoteFooter>
        {author &&
          author.id && (
            <NoteAuthor>{author.name}</NoteAuthor>
          )}
        <NoteDate>
          {
            selectedNote.updated_at === selectedNote.created_at
              ? formatDateToString(String(selectedNote.created_at))
              : formatDateToString(String(selectedNote.updated_at))
          }
        </NoteDate>
      </NoteFooter>
    </Container>
  );
};
