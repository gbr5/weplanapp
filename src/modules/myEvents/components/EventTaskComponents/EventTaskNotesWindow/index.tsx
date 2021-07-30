import React from 'react';
import { useEffect } from 'react';
import { Note } from '../../../../../components/Note';
import { NoteForm } from '../../../../../components/NoteForm';
import WindowContainer from '../../../../../components/WindowContainer';
import { useEventTasks } from '../../../../../hooks/eventTasks';
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
  const { selectedTask, getEvent, selectedEvent } = useMyEvent();
  const { createTaskNote } = useEventTasks();
  const { updateNotes } = useNote();

  async function handleCreateTaskNote(note: string) {
    await createTaskNote({
      note,
      task_id: selectedTask.id,
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
        <TaskTitle>Tarefa: {selectedTask.title}</TaskTitle>

        <NoteForm
          handleNote={(data: string) => handleCreateTaskNote(data)}
          placeholder=""
        />

        <NotesContainer
          data={selectedTask.notes.map(taskNotes => taskNotes.note)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Note key={item.id} selectedNote={item} />
          )}
        />
      </Container>
    </WindowContainer>
  );
};
