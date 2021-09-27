import React, { useEffect } from 'react';
import { Note } from '../../../../../components/Note';
import { NoteForm } from '../../../../../components/NoteForm';
import WindowContainer from '../../../../../components/WindowContainer';
import { useEventTasks } from '../../../../../hooks/eventTasks';
import { useEventVariables } from '../../../../../hooks/eventVariables';
import { useMyEvent } from '../../../../../hooks/myEvent';
import { useNote } from '../../../../../hooks/notes';

import {
  Container,
  NotesContainer,
  Title,
  Underline,
  TaskTitle,
} from './styles';

interface IProps {
  closeWindow: () => void;
}

export function EventTaskNotesWindow({
  closeWindow,
}: IProps) {
  const { selectedEventTask, selectedEvent } = useEventVariables();
  const { getEvent } = useMyEvent();
  const { createTaskNote } = useEventTasks();
  const { updateNotes } = useNote();

  async function handleCreateTaskNote(note: string) {
    await createTaskNote({
      note,
      task_id: selectedEventTask.id,
    });
    await getEvent(selectedEvent.id);
  }

  useEffect(() => {
    updateNotes();
  }, []);

  return (
    <WindowContainer
      closeWindow={closeWindow}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
      zIndex={15}
    >
      <Container>
        <Title>Notas</Title>
        <Underline />
        <TaskTitle>Tarefa: {selectedEventTask.title}</TaskTitle>

        <NoteForm
          handleNote={(data: string) => handleCreateTaskNote(data)}
          placeholder=""
        />

        <NotesContainer
          data={selectedEventTask.notes.map(taskNotes => taskNotes.note)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Note key={item.id} selectedNote={item} />
          )}
        />
      </Container>
    </WindowContainer>
  );
};
