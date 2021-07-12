import React, {
  useContext,
  createContext,
  useState,
} from 'react';

import api from '../services/api';

import IEventTaskDTO from '../dtos/IEventTaskDTO';
import ICreateEventTaskDTO from '../dtos/ICreateEventTaskDTO';
import { useMyEvent } from './myEvent';
import ICreateEventTaskNoteDTO from '../dtos/ICreateEventTaskNoteDTO';
import { useAuth } from './auth';
import IEventTaskNoteDTO from '../dtos/IEventTaskNoteDTO';

interface EventTasksContextType {
  loading: boolean;
  status: 'not started' | 'running' | 'finnished';
  editTaskTitleWindow: boolean;
  editTaskPriorityWindow: boolean;
  editTaskStatusWindow: boolean;
  editTaskDateWindow: boolean;
  editTaskTimeWindow: boolean;
  eventTaskNotesWindow: boolean;
  createTask: (data: ICreateEventTaskDTO) => Promise<void>;
  updateTask: (data: IEventTaskDTO) => Promise<void>;
  deleteTask: (data: IEventTaskDTO) => Promise<void>;
  createTaskNote: (data: ICreateEventTaskNoteDTO) => Promise<void>;
  deleteTaskNote: (data: IEventTaskNoteDTO) => Promise<void>;
  handleEditTaskTitleWindow: () => void;
  handleEditTaskPriorityWindow: () => void;
  handleEditTaskStatusWindow: () => void;
  handleEditTaskDateWindow: () => void;
  handleEditTaskTimeWindow: () => void;
  handleEventTaskNotesWindow: () => void;
  selectStatus: (status: 'not started' | 'running' | 'finnished') => void;
}

const EventTasksContext = createContext({} as EventTasksContextType);

const EventTasksProvider: React.FC = ({ children }) => {
  const { getEventTasks, selectedEvent } = useMyEvent();
  const [editTaskTitleWindow, setEditTaskTitleWindow] = useState(false);
  const [editTaskPriorityWindow, setEditTaskPriorityWindow] = useState(false);
  const [editTaskStatusWindow, setEditTaskStatusWindow] = useState(false);
  const [editTaskDateWindow, setEditTaskDateWindow] = useState(false);
  const [editTaskTimeWindow, setEditTaskTimeWindow] = useState(false);
  const [eventTaskNotesWindow, setEventTaskNotesWindow] = useState(false);
  const [status, setStatus] = useState<'not started' | 'running' | 'finnished'>('not started');
  const [loading, setLoading] = useState(false);

  function handleEditTaskTitleWindow() {
    setEditTaskTitleWindow(!editTaskTitleWindow);
  }

  function handleEditTaskPriorityWindow() {
    setEditTaskPriorityWindow(!editTaskPriorityWindow);
  }

  function handleEditTaskStatusWindow() {
    setEditTaskStatusWindow(!editTaskStatusWindow);
  }

  function handleEditTaskDateWindow() {
    setEditTaskDateWindow(!editTaskDateWindow);
  }

  function handleEditTaskTimeWindow() {
    setEditTaskTimeWindow(!editTaskTimeWindow);
  }

  function handleEventTaskNotesWindow() {
    setEventTaskNotesWindow(!eventTaskNotesWindow);
  }

  async function createTask({
    due_date,
    event_id,
    priority,
    status,
    title,
  }: ICreateEventTaskDTO) {
    try {
      setLoading(true);
      await api.post(`event-tasks/${event_id}`, {
        due_date,
        event_id,
        priority,
        status,
        title,
      });
      getEventTasks(event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateTask(data: IEventTaskDTO) {
    try {
      setLoading(true);
      await api.put(`/event-tasks/${data.id}`, data);
      await getEventTasks(data.event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(data: IEventTaskDTO) {
    try {
      setLoading(true);
      await api.delete(`/event-tasks/${data.id}`);
      await getEventTasks(data.event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createTaskNote(data: ICreateEventTaskNoteDTO) {
    try {
      setLoading(true);
      const noteresponse = await api.post(`/event-task-notes`, data);
      const response = await getEventTasks(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTaskNote(data: IEventTaskNoteDTO) {
    try {
      setLoading(true);
      await api.delete(`/event-task-notes/${data.id}`);
      await getEventTasks(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  function selectStatus(data: 'not started' | 'running' | 'finnished') {
    setStatus(data);
  }

  return (
    <EventTasksContext.Provider
      value={{
        loading,
        status,
        editTaskTitleWindow,
        editTaskPriorityWindow,
        editTaskStatusWindow,
        editTaskDateWindow,
        editTaskTimeWindow,
        eventTaskNotesWindow,
        createTask,
        updateTask,
        deleteTask,
        createTaskNote,
        deleteTaskNote,
        handleEditTaskTitleWindow,
        handleEditTaskPriorityWindow,
        handleEditTaskStatusWindow,
        handleEditTaskDateWindow,
        handleEditTaskTimeWindow,
        handleEventTaskNotesWindow,
        selectStatus,
      }}
    >
      {children}
    </EventTasksContext.Provider>
  );
};

function useEventTasks(): EventTasksContextType {
  const context = useContext(EventTasksContext);

  if (!context) throw new Error('useEventTasks must be used within an AuthProvider');
  return context;
}

export { EventTasksProvider, useEventTasks };
