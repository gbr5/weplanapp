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
import ITaskNoteDTO from '../dtos/ITaskNoteDTO';
import { useEventVariables } from './eventVariables';
import IUserFollowerDTO from '../dtos/IUserFollowerDTO';
import ITaskDTO from '../dtos/ITaskDTO';

interface ICreateEventOwnerTaskDTO extends ICreateEventTaskDTO {
  owner_id: string;
}
interface ICreateEventMemberTaskDTO extends ICreateEventTaskDTO {
  member_id: string;
}
interface ICreateEventWePlanSupplierTaskDTO extends ICreateEventTaskDTO {
  supplier_id: string;
}

interface EventTasksContextType {
  loading: boolean;
  status: 'not started' | 'running' | 'finnished';
  editTaskPriorityWindow: boolean;
  editTaskStatusWindow: boolean;
  editTaskDateWindow: boolean;
  editTaskTimeWindow: boolean;
  selectTaskDateWindow: boolean;
  selectTaskTimeWindow: boolean;
  eventTaskNotesWindow: boolean;
  eventTaskFollowersWindow: boolean;
  createEventTaskFollowersWindow: boolean;
  deleteTaskConfirmationWindow: boolean;
  eventTaskFollowersDescriptionWindow: boolean;
  userEventTasksWindow: boolean;
  deleteTaskFollowerConfirmation: boolean;
  createTaskWindow: boolean;
  taskDate: Date;
  createMultipleEventTaskFollowers: (data: IUserFollowerDTO[]) => Promise<void>;
  createEventTask: (data: ICreateEventTaskDTO) => Promise<void>;
  createEventOwnerTask: (data: ICreateEventOwnerTaskDTO) => Promise<void>;
  createEventMemberTask: (data: ICreateEventMemberTaskDTO) => Promise<void>;
  createEventWePlanSupplierTask: (data: ICreateEventWePlanSupplierTaskDTO) => Promise<void>;
  updateTask: (data: ITaskDTO) => Promise<void>;
  deleteTask: (data: IEventTaskDTO) => Promise<void>;
  deleteTaskFollower: () => Promise<void>;
  createTaskNote: (data: ICreateEventTaskNoteDTO) => Promise<void>;
  deleteTaskNote: (data: ITaskNoteDTO) => Promise<void>;
  handleEditTaskPriorityWindow: () => void;
  handleEditTaskStatusWindow: () => void;
  handleEditTaskDateWindow: () => void;
  handleEditTaskTimeWindow: () => void;
  handleSelectTaskDateWindow: () => void;
  handleSelectTaskTimeWindow: () => void;
  handleEventTaskNotesWindow: () => void;
  handleEventTaskFollowersWindow: () => void;
  handleCreateEventTaskFollowersWindow: () => void;
  handleDeleteTaskFollowerConfirmation: () => void;
  handleEventTaskFollowersDescriptionWindow: () => void;
  handleCreateTaskWindow: () => void;
  handleUserEventTasksWindow: () => void;
  handleDeleteTaskConfirmationWindow: () => void;
  selectStatus: (status: 'not started' | 'running' | 'finnished') => void;
  selectTaskDate: (data: Date) => void;
  unsetEventTasksVariables: () => void;
}

const EventTasksContext = createContext({} as EventTasksContextType);

const EventTasksProvider: React.FC = ({ children }) => {
  const {
    selectedEvent,
    selectedEventTask,
    selectEventTask,
    selectedEventTaskFollower,
  } = useEventVariables();
  const {
    getEvent,
    getEventNotes,
    getEventTasks,
    getSelectedUserEventTasks,
  } = useMyEvent();
  const [editTaskPriorityWindow, setEditTaskPriorityWindow] = useState(false);
  const [editTaskStatusWindow, setEditTaskStatusWindow] = useState(false);
  const [editTaskDateWindow, setEditTaskDateWindow] = useState(false);
  const [editTaskTimeWindow, setEditTaskTimeWindow] = useState(false);
  const [selectTaskDateWindow, setSelectTaskDateWindow] = useState(false);
  const [selectTaskTimeWindow, setSelectTaskTimeWindow] = useState(false);
  const [eventTaskNotesWindow, setEventTaskNotesWindow] = useState(false);
  const [userEventTasksWindow, setUserEventTasksWindow] = useState(false);
  const [eventTaskFollowersWindow, setEventTaskFollowersWindow] = useState(false);
  const [createEventTaskFollowersWindow, setCreateEventTaskFollowersWindow] = useState(false);
  const [deleteTaskConfirmationWindow, setDeleteTaskConfirmationWindow] = useState(false);
  const [status, setStatus] = useState<'not started' | 'running' | 'finnished'>('not started');
  const [createTaskWindow, setCreateTaskWindow] = useState(false);
  const [taskDate, setTaskDate] = useState(addDays(new Date(), 3));
  const [loading, setLoading] = useState(false);
  const [deleteTaskFollowerConfirmation, setDeleteTaskFollowerConfirmation] = useState(false);
  const [eventTaskFollowersDescriptionWindow, setEventTaskFollowersDescriptionWindow] = useState(false);

  function unsetEventTasksVariables() {
    setEditTaskPriorityWindow(false);
    setEditTaskStatusWindow(false);
    setEditTaskDateWindow(false);
    setEditTaskTimeWindow(false);
    setSelectTaskDateWindow(false);
    setSelectTaskTimeWindow(false);
    setEventTaskNotesWindow(false);
    setDeleteTaskConfirmationWindow(false);
    setDeleteTaskFollowerConfirmation(false);
    setEventTaskFollowersDescriptionWindow(false);
    setStatus('not started');
    setCreateTaskWindow(false);
    setTaskDate(addDays(new Date(), 3));
    setLoading(false);
  }

  function handleEventTaskFollowersDescriptionWindow() {
    setEventTaskFollowersDescriptionWindow(!eventTaskFollowersDescriptionWindow);
  }

  function handleUserEventTasksWindow() {
    setUserEventTasksWindow(!userEventTasksWindow);
  }

  function handleDeleteTaskFollowerConfirmation() {
    setDeleteTaskFollowerConfirmation(!deleteTaskFollowerConfirmation);
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

  function handleEventTaskFollowersWindow() {
    setEventTaskFollowersWindow(!eventTaskFollowersWindow);
  }

  function handleCreateEventTaskFollowersWindow() {
    setCreateEventTaskFollowersWindow(!createEventTaskFollowersWindow);
  }

  function handleCreateTaskWindow() {
    setCreateTaskWindow(!createTaskWindow);
  }

  function handleDeleteTaskConfirmationWindow() {
    setDeleteTaskConfirmationWindow(!deleteTaskConfirmationWindow)
  }

  async function createEventTask({
    due_date,
    event_id,
    priority,
    status,
    title,
  }: ICreateEventTaskDTO) {
    try {
      setLoading(true);
      await api.post(`/event-tasks`, {
        due_date,
        event_id,
        priority,
        status,
        title,
      });
      await getEventTasks(event_id);
      await getEventNotes(event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createEventWePlanSupplierTask({
    due_date,
    event_id,
    supplier_id,
    priority,
    status,
    title,
  }: ICreateEventWePlanSupplierTaskDTO) {
    try {
      setLoading(true);
      await api.post(`/create-event-weplan-supplier-task`, {
        due_date,
        event_id,
        supplier_id,
        priority,
        status,
        title,
      });
      await getEventTasks(event_id);
      await getSelectedUserEventTasks(supplier_id);
      await getEventNotes(event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createEventMemberTask({
    due_date,
    event_id,
    member_id,
    priority,
    status,
    title,
  }: ICreateEventMemberTaskDTO) {
    try {
      setLoading(true);
      const response = await api.post(`/create-event-member-task`, {
        due_date,
        event_id,
        member_id,
        priority,
        status,
        title,
      });
      await getEventTasks(event_id);
      await getSelectedUserEventTasks(member_id);
      await getEventNotes(event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createEventOwnerTask({
    due_date,
    event_id,
    owner_id,
    priority,
    status,
    title,
  }: ICreateEventOwnerTaskDTO) {
    try {
      setLoading(true);
      await api.post(`/create-event-owner-task`, {
        due_date,
        event_id,
        owner_id,
        priority,
        status,
        title,
      });
      await getEventTasks(event_id);
      await getSelectedUserEventTasks(owner_id);
      await getEventNotes(event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createMultipleEventTaskFollowers(data: IUserFollowerDTO[]) {
    try {
      setLoading(true);
      const followers = data.map(follower => {
        return {
          user_id: follower.follower.id,
          type: follower.type,
        };
      });
      await api.post(`/create-multiple-task-followers`, {
        task_id: selectedEventTask.task.id,
        followers,
      });
      await getEventTasks(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateTask(data: ITaskDTO) {
    try {
      setLoading(true);
      const {
        id,
        title,
        due_date,
        priority,
        status,
      } = data;
      const response = await api.put(`/tasks/`, {
        id,
        title,
        due_date,
        priority,
        status,
      });
      selectedEventTask && selectedEventTask.id && selectEventTask({
        ...selectedEventTask,
        task: response.data,
      });
      await getEventTasks(selectedEvent.id);
      await getEventNotes(selectedEvent.id);
      selectStatus(data.status);
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

  async function deleteTaskFollower() {
    try {
      setLoading(true);
      await api.delete(`/task-followers/${selectedEventTaskFollower.id}`);
      handleDeleteTaskFollowerConfirmation();
      await getEventTasks(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createTaskNote(data: ICreateEventTaskNoteDTO) {
    try {
      setLoading(true);
      await api.post(`/task-notes`, data);
      await getEvent(selectedEvent.id);
      await getEventTasks(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTaskNote(data: ITaskNoteDTO) {
    try {
      setLoading(true);
      await api.delete(`/task-notes/${data.id}`);
      await getEvent(selectedEvent.id);
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
        createEventTaskFollowersWindow,
        createMultipleEventTaskFollowers,
        status,
        editTaskPriorityWindow,
        editTaskStatusWindow,
        editTaskDateWindow,
        editTaskTimeWindow,
        selectTaskDateWindow,
        selectTaskTimeWindow,
        eventTaskNotesWindow,
        eventTaskFollowersWindow,
        deleteTaskConfirmationWindow,
        taskDate,
        createTaskWindow,
        createEventTask,
        createEventOwnerTask,
        createEventMemberTask,
        createEventWePlanSupplierTask,
        updateTask,
        deleteTask,
        createTaskNote,
        deleteTaskNote,
        handleEditTaskPriorityWindow,
        handleEditTaskStatusWindow,
        handleEditTaskDateWindow,
        handleEditTaskTimeWindow,
        handleSelectTaskDateWindow,
        handleSelectTaskTimeWindow,
        handleEventTaskNotesWindow,
        handleEventTaskFollowersWindow,
        handleCreateEventTaskFollowersWindow,
        handleCreateTaskWindow,
        handleDeleteTaskConfirmationWindow,
        selectStatus,
        selectTaskDate,
        unsetEventTasksVariables,
        handleDeleteTaskFollowerConfirmation,
        deleteTaskFollowerConfirmation,
        deleteTaskFollower,
        handleEventTaskFollowersDescriptionWindow,
        eventTaskFollowersDescriptionWindow,
        handleUserEventTasksWindow,
        userEventTasksWindow,
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
