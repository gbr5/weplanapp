import React, {
  useContext,
  createContext,
  useState,
} from 'react';

import { addDays } from 'date-fns';

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
  selectTaskDateWindow: boolean;
  selectTaskTimeWindow: boolean;
  eventTaskNotesWindow: boolean;
  deleteTaskConfirmationWindow: boolean;
  createTaskWindow: boolean;
  taskDate: Date;
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
  handleSelectTaskDateWindow: () => void;
  handleSelectTaskTimeWindow: () => void;
  handleEventTaskNotesWindow: () => void;
  handleCreateTaskWindow: () => void;
  handleDeleteTaskConfirmationWindow: () => void;
  selectStatus: (status: 'not started' | 'running' | 'finnished') => void;
  selectTaskDate: (data: Date) => void;
}

const EventTasksContext = createContext({} as EventTasksContextType);

const EventTasksProvider: React.FC = ({ children }) => {
  const { getEventTasks, selectedEvent } = useMyEvent();
  const [editTaskTitleWindow, setEditTaskTitleWindow] = useState(false);
  const [editTaskPriorityWindow, setEditTaskPriorityWindow] = useState(false);
  const [editTaskStatusWindow, setEditTaskStatusWindow] = useState(false);
  const [editTaskDateWindow, setEditTaskDateWindow] = useState(false);
  const [editTaskTimeWindow, setEditTaskTimeWindow] = useState(false);
  const [selectTaskDateWindow, setSelectTaskDateWindow] = useState(false);
  const [selectTaskTimeWindow, setSelectTaskTimeWindow] = useState(false);
  const [eventTaskNotesWindow, setEventTaskNotesWindow] = useState(false);
  const [deleteTaskConfirmationWindow, setDeleteTaskConfirmationWindow] = useState(false);
  const [status, setStatus] = useState<'not started' | 'running' | 'finnished'>('not started');
  const [createTaskWindow, setCreateTaskWindow] = useState(false);
  const [taskDate, setTaskDate] = useState(addDays(new Date(), 3));
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

  function handleSelectTaskDateWindow() {
    setSelectTaskDateWindow(!selectTaskDateWindow);
  }

  function handleSelectTaskTimeWindow() {
    setSelectTaskTimeWindow(!selectTaskTimeWindow);
  }

  function handleEventTaskNotesWindow() {
    setEventTaskNotesWindow(!eventTaskNotesWindow);
  }

  function handleCreateTaskWindow() {
    setCreateTaskWindow(!createTaskWindow);
  }

  function handleDeleteTaskConfirmationWindow() {
    setDeleteTaskConfirmationWindow(!deleteTaskConfirmationWindow)
  }

  async function createTask({
    due_date,
    event_id,
    priority,
    status,
    title,
  }: ICreateEventTaskDTO) {
    try {
      console.log({
        due_date,
        event_id,
        priority,
        status,
        title,
      });
      setLoading(true);
      await api.post(`/event-tasks`, {
        due_date,
        event_id,
        priority,
        status,
        title,
      });
      await getEventTasks(event_id);
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

  function selectTaskDate(data: Date) {
    setTaskDate(data);
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
        selectTaskDateWindow,
        selectTaskTimeWindow,
        eventTaskNotesWindow,
        deleteTaskConfirmationWindow,
        taskDate,
        createTaskWindow,
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
        handleSelectTaskDateWindow,
        handleSelectTaskTimeWindow,
        handleEventTaskNotesWindow,
        handleCreateTaskWindow,
        handleDeleteTaskConfirmationWindow,
        selectStatus,
        selectTaskDate,
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
