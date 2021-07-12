import React, { useCallback, useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { useMyEvent } from '../../../../hooks/myEvent';

import MainMenu from '../../components/MainMenu';
import NewGuestForm from '../../components/NewGuestForm';
import PageHeader from '../../../../components/PageHeader';
import GuestsSection from '../../components/GuestsSection';
import { TasksSection } from '../../components/EventTaskComponents/TasksSection';

import {
  Container,
  EventName,
  Body,
  DashboardButton,
  BodyContainer,
} from './styles';
import { useEventTasks } from '../../../../hooks/eventTasks';
import { TextInputForm } from '../../../../components/TextInputForm';
import IEventTaskDTO from '../../../../dtos/IEventTaskDTO';
import { EditTaskPriorityWindow } from '../../components/EventTaskComponents/EditTaskPriorityWindow';
import { EditTaskStatusWindow } from '../../components/EventTaskComponents/EditTaskStatusWindow';
import { DatePickerWindow } from '../../../../components/DatePickerWindow';
import { TimePickerWindow } from '../../../../components/TimePickerWindow';
import { EventTaskNotesWindow } from '../../components/EventTaskComponents/EventTaskNotesWindow';
import NewTaskForm from '../../components/EventTaskComponents/NewTaskForm';

const MyEvent: React.FC = () => {
  const {
    selectedEvent,
    currentSection,
    selectEventSection,
    selectedTask,
    selectEventTask,
  } = useMyEvent();
  const {
    loading,
    editTaskTitleWindow,
    editTaskPriorityWindow,
    editTaskStatusWindow,
    editTaskDateWindow,
    editTaskTimeWindow,
    selectTaskDateWindow,
    selectTaskTimeWindow,
    eventTaskNotesWindow,
    createTaskWindow,
    taskDate,
    selectTaskDate,
    handleEditTaskTitleWindow,
    handleEditTaskDateWindow,
    handleEditTaskTimeWindow,
    handleSelectTaskDateWindow,
    handleSelectTaskTimeWindow,
    handleEventTaskNotesWindow,
    handleCreateTaskWindow,
    updateTask,
  } = useEventTasks();
  const [newGuestForm, setNewGuestForm] = useState(false);

  function handleCloseEditTaskTitleWindow() {
    selectEventTask({} as IEventTaskDTO);
    handleEditTaskTitleWindow();
  }

  function handleCloseEditTaskDateWindow() {
    selectEventTask({} as IEventTaskDTO);
    handleEditTaskDateWindow();
  }

  function handleCloseEditTaskTimeWindow() {
    selectEventTask({} as IEventTaskDTO);
    handleEditTaskTimeWindow();
  }

  function handleCloseEventTaskNotesWindow() {
    selectEventTask({} as IEventTaskDTO);
    handleEventTaskNotesWindow();
  }

  async function handleUpdateTaskTitle(title: string) {
    await updateTask({
      ...selectedTask,
      title,
    });
  }

  async function handleUpdateTaskDate(date: Date) {
    await updateTask({
      ...selectedTask,
      due_date: date,
    });
    handleCloseEditTaskDateWindow();
  }

  async function handleUpdateTaskTime(date: Date) {
    await updateTask({
      ...selectedTask,
      due_date: date,
    });
    handleCloseEditTaskTimeWindow();
  }

  const handleNewGuestForm = useCallback((e: boolean) => {
    setNewGuestForm(e);
  }, []);

  useEffect(() => {
    currentSection === 'Tasks' && Alert.alert(currentSection);
  }, [currentSection]);

  return (
    <>
      {newGuestForm && (
        <NewGuestForm closeWindow={() => handleNewGuestForm(false)} />
      )}
      {editTaskTitleWindow
        && selectedTask
        && selectedTask.id && (
          <TextInputForm
            closeWindow={handleCloseEditTaskTitleWindow}
            onHandleSubmit={(title: string) => handleUpdateTaskTitle(title)}
            title="Defina a tarefa"
            placeholder={selectedTask.title}
          />
      )}
      {editTaskPriorityWindow
        && selectedTask
        && selectedTask.id && (
          <EditTaskPriorityWindow />
      )}

      {editTaskStatusWindow
        && selectedTask
        && selectedTask.id && (
          <EditTaskStatusWindow />
      )}

      {editTaskDateWindow
        && selectedTask
        && selectedTask.id && (
          <DatePickerWindow
            loading={loading}
            closeWindow={handleCloseEditTaskDateWindow}
            selectDate={handleUpdateTaskDate}
            selectedDate={new Date(selectedTask.due_date)}
          />
      )}

      {editTaskTimeWindow
        && selectedTask
        && selectedTask.id && (
          <TimePickerWindow
            loading={loading}
            closeWindow={handleCloseEditTaskTimeWindow}
            selectDate={handleUpdateTaskTime}
            selectedDate={new Date(selectedTask.due_date)}
          />
      )}

      {selectTaskDateWindow && (
        <DatePickerWindow
          loading={loading}
          closeWindow={handleSelectTaskDateWindow}
          selectDate={(data: Date) => selectTaskDate(data)}
          selectedDate={taskDate}
        />
      )}

      {selectTaskTimeWindow && (
        <TimePickerWindow
          loading={loading}
          closeWindow={handleSelectTaskTimeWindow}
          selectDate={(data: Date) => selectTaskDate(data)}
          selectedDate={taskDate}
        />
      )}

      {editTaskStatusWindow
        && selectedTask
        && selectedTask.id && (
          <EditTaskStatusWindow />
      )}

      {eventTaskNotesWindow
        && selectedTask
        && selectedTask.id && (
          <EventTaskNotesWindow
            closeWindow={handleCloseEventTaskNotesWindow}
          />
      )}

      {createTaskWindow && (
        <NewTaskForm
          closeWindow={handleCreateTaskWindow}
        />
      )}

      <Container>
        <PageHeader>
          <DashboardButton onPress={() => selectEventSection('Tasks')}>
            <EventName>{selectedEvent.name}</EventName>
          </DashboardButton>
        </PageHeader>
        <Body>
          <MainMenu />
          <BodyContainer>
            {currentSection === 'Guests' && (
              <GuestsSection
                handleNewGuestForm={() => handleNewGuestForm(true)}
              />
            )}
            {currentSection === 'Tasks' && (
              <TasksSection />
            )}
          </BodyContainer>
        </Body>
      </Container>
    </>
  );
};

export default MyEvent;
