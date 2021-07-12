import React, {
  useContext,
  createContext,
  useState,
} from 'react';

import api from '../services/api';

import INoteDTO from '../dtos/INoteDTO';
import { useMyEvent } from './myEvent';

interface NoteContextType {
  loading: boolean;
  editNoteWindow: boolean;
  selectedNote: INoteDTO;
  handleEditNoteWindow: () => void;
  editNote: (data: INoteDTO) => Promise<void>;
  updateNotes: () => Promise<void>;
  selectNote: (data: INoteDTO) => void;
  // getTaskNotes: () => Promise<void>;
}

const NoteContext = createContext({} as NoteContextType);

const NoteProvider: React.FC = ({ children }) => {
  const { selectedEvent, selectedTask, getEventTasks } = useMyEvent();

  const [editNoteWindow, setEditNoteWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState({} as INoteDTO);

  function selectNote(data: INoteDTO) {
    setSelectedNote(data);
  }

  async function editNote({
    id,
    note,
  }: INoteDTO) {
    try {
      setLoading(true);
      await api.put('/notes', {
        id,
        note,
      });
      await getEventTasks(selectedEvent.id);
      setSelectedNote({} as INoteDTO);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateNotes() {
    Promise.all([
      selectedTask.notes.filter(taskNote => taskNote.note.isNew).map(taskNote => {
        return api.put('/notes', {
          id: taskNote.note.id,
          note: taskNote.note.note,
        });
      }),
    ]);
  }

  function handleEditNoteWindow() {
    setEditNoteWindow(!editNoteWindow);
  }

  // async function getTasksNotes() {
  //   try {
  //     setLoading(true);
  //     await api.get(`event-task-notes/${selectedTask.id}`)

  //   } catch(err) {
  //     throw new Error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <NoteContext.Provider
      value={{
        loading,
        editNoteWindow,
        selectedNote,
        handleEditNoteWindow,
        editNote,
        updateNotes,
        selectNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

function useNote(): NoteContextType {
  const context = useContext(NoteContext);

  if (!context) throw new Error('useNote must be used within an AuthProvider');
  return context;
}

export { NoteProvider, useNote };
