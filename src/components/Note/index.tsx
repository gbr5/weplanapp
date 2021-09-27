import React, { useMemo, useState } from 'react';
import INoteDTO from '../../dtos/INoteDTO';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';
import { useEventVariables } from '../../hooks/eventVariables';
import { useMyEvent } from '../../hooks/myEvent';
import { useNote } from '../../hooks/notes';
import formatDateToString from '../../utils/formatDateToString';
import CloseButton from '../CloseButton';
import { NoteForm } from '../NoteForm';

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
  updateNotes?: () => Promise<void>;
}

export function Note({
  selectedNote,
  updateNotes,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { user } = useAuth();
  const { getEventNotes } = useMyEvent();
  const { selectedEvent, eventOwners, eventMembers } = useEventVariables();
  const { editNote } = useNote();

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleEdit() {
    setEdit(!edit);
  }

  const author = useMemo(() => {
    if (selectedEvent.id === selectedNote.author_id) return 'WePlan';
    if (user.id === selectedNote.author_id) {
      const { personInfo } = user;
      return personInfo
        ? `${personInfo.first_name}  ${personInfo.last_name}`
        : user.name;
    }
    const findOwner = eventOwners.find(
      owner => owner.userEventOwner.id === selectedNote.author_id,
    );
    if (findOwner) {
      const owner = findOwner.userEventOwner.personInfo;
      return owner
        ? `${owner.first_name}  ${owner.last_name}`
        : findOwner.userEventOwner.name;
    }
    const findMember = eventMembers.find(
      owner => owner.userEventMember.id === selectedNote.author_id,
    );
    if (findMember) {
      const member = findMember.userEventMember.personInfo;
      return member
        ? `${member.first_name}  ${member.last_name}`
        : findMember.userEventMember.name;
    }
    return '';
  }, [eventOwners, eventMembers, user, selectedEvent, selectedNote]);

  async function handleEditNote(note: string) {
    try {
      setLoading(true);
      await editNote({
        ...selectedNote,
        note,
      });
      setEdit(false);
      await getEventNotes(selectedEvent.id);
      updateNotes && await updateNotes();
    } catch {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }

  const canEdit = useMemo(() => {
    if (selectedEvent.id === selectedNote.author_id) return false;
    return selectedEvent.user_id === user.id || selectedNote.author_id === user.id;
  }, [selectedNote, selectedEvent, user]);

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 5,
      }}
      onPress={handleEdit}
    >
      {edit ? (
        <>
          <CloseButton closeFunction={handleEdit}/>
          <NoteForm placeholder={selectedNote.note} handleNote={handleEditNote} />
        </>
      ) : (
        <>
          <TextNote>{selectedNote.note}</TextNote>
          {loading && (
            <EditNoteButton>
              <EditNoteIcon name="loader" size={32} />
            </EditNoteButton>
          )}
          {!loading && canEdit && (
            <EditNoteButton
              onPress={handleEdit}
              style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
                elevation: 5,
              }}
            >
              <EditNoteIcon name="edit-2" />
            </EditNoteButton>
          )}
        </>
      )}
      <NoteFooter>
        <NoteAuthor>{author}</NoteAuthor>
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
