import React, { useCallback, useState, useEffect } from 'react';

import { useMyEvent } from '../../../../hooks/myEvent';
import { useEventTasks } from '../../../../hooks/eventTasks';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { useNote } from '../../../../hooks/notes';
import { useTransaction } from '../../../../hooks/transactions';

import IEventTaskDTO from '../../../../dtos/IEventTaskDTO';
import INoteDTO from '../../../../dtos/INoteDTO';

import { SelectSupplierCategory } from '../../components/SuppliersComponents/SelectSupplierCategory';
import { SelectSupplierSubCategory } from '../../components/SuppliersComponents/SelectSupplierSubCategory';
import NewSupplierForm from '../../components/SuppliersComponents/NewSupplierForm';
import { BudgetWindow } from '../../components/BudgetWindow';
import { CreateSupplierTransactionAgreement } from '../../components/SuppliersComponents/CreateSupplierTransactionAgreement';
import { FinancialSection } from '../../components/FinancialComponents/FinancialSection';
import { CreateSupplierTransactions } from '../../components/SuppliersComponents/CreateSupplierTransactions';
import { NewEventSupplierTransactionAgreementConfirmation } from '../../components/SuppliersComponents/NewEventSupplierTransactionAgreementConfirmation';
import { MainMenu } from '../../components/MainMenu';
import NewGuestForm from '../../components/EventGuestComponents/NewGuestForm';
import PageHeader from '../../../../components/PageHeader';
import GuestsSection from '../../components/EventGuestComponents/GuestsSection';
import { TasksSection } from '../../components/EventTaskComponents/TasksSection';
import { TextInputForm } from '../../../../components/TextInputForm';
import { EditTaskPriorityWindow } from '../../components/EventTaskComponents/EditTaskPriorityWindow';
import { EditTaskStatusWindow } from '../../components/EventTaskComponents/EditTaskStatusWindow';
import { DatePickerWindow } from '../../../../components/DatePickerWindow';
import { TimePickerWindow } from '../../../../components/TimePickerWindow';
import { EventTaskNotesWindow } from '../../components/EventTaskComponents/EventTaskNotesWindow';
import NewTaskForm from '../../components/EventTaskComponents/NewTaskForm';
import ShortConfirmationWindow from '../../../../components/ShortConfirmationWindow';
import { EditNoteWindow } from '../../../../components/EditNoteWindow';
import { SuppliersSection } from '../../components/SuppliersComponents/SuppliersSection';

import {
  Container,
  EventName,
  Body,
  DashboardButton,
  BodyContainer,
} from './styles';
import { DischargeSupplierWindow } from '../../components/SuppliersComponents/DischargeSupplierWindow';
import { EditTransactionValue } from '../../components/SuppliersComponents/EditTransactionValue';
import { CancelAllAgreements } from '../../components/SuppliersComponents/CancelAllAgreements';

const MyEvent: React.FC = () => {
  const {
    currentSection,
    eventSuppliers,
    selectedEvent,
    selectedSupplier,
    selectEventSection,
    selectedTask,
    selectEventTask,
    budgetWindow,
    calculateTotalEventCost,
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
    deleteTaskConfirmationWindow,
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
    handleDeleteTaskConfirmationWindow,
    updateTask,
    deleteTask,
  } = useEventTasks();
  const {
    addSupplierWindow,
    cancelAllAgreementsWindow,
    selectedSupplierTransactionAgreement,
    dischargingWindow,
    supplierCategoryWindow,
    supplierSubCategoryWindow,
    createSupplierTransactionAgreementWindow,
    handleAddSupplierWindow,
    createSupplierTransactionsWindow,
  } = useEventSuppliers();
  const { editNoteWindow, selectNote, handleEditNoteWindow } = useNote();
  const {
    handleSelectedDateWindow,
    handleSelectedDate,
    selectedDateWindow,
    selectedDate,
    newEventSupplierTransactionAgreement,
    selectedTransaction,
    editTransactionValueWindow,
  } = useTransaction();

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

  function handleCloseEditTaskNoteWindow() {
    handleEditNoteWindow();
    selectNote({} as INoteDTO);
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

  async function handleDeleteTask() {
    await deleteTask(selectedTask);
    handleDeleteTaskConfirmationWindow();
  }

  useEffect(() => {
    calculateTotalEventCost();
  }, [calculateTotalEventCost, eventSuppliers]);

  return (
    <>
      {budgetWindow && (
        <BudgetWindow />
      )}

      {selectedSupplierTransactionAgreement
        && selectedSupplierTransactionAgreement.id
        && selectedTransaction
        && selectedTransaction.id
        && editTransactionValueWindow && (
          <EditTransactionValue />
        )
      }

      {selectedSupplier
        && selectedSupplier.id
        && cancelAllAgreementsWindow && (
          <CancelAllAgreements />
        )
      }

      {dischargingWindow && (
        <DischargeSupplierWindow />
      )}
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

      {deleteTaskConfirmationWindow && (
        <ShortConfirmationWindow
          closeWindow={handleDeleteTaskConfirmationWindow}
          question="Deseja mesmo deletar a tarefa?"
          firstButtonLabel="Não deletar"
          firstFunction={handleDeleteTaskConfirmationWindow}
          secondButtonLabel="Deletar"
          secondFunction={handleDeleteTask}
        />
      )}

      {editNoteWindow && (
        <EditNoteWindow closeWindow={handleCloseEditTaskNoteWindow} />
      )}

      {addSupplierWindow && (
        <NewSupplierForm closeWindow={handleAddSupplierWindow} />
      )}

      {supplierCategoryWindow && (
        <SelectSupplierCategory />
      )}

      {supplierSubCategoryWindow && (
        <SelectSupplierSubCategory />
      )}

      {createSupplierTransactionAgreementWindow &&
        selectedSupplier &&
        selectedSupplier.id && (
          <CreateSupplierTransactionAgreement />
        )}

      {createSupplierTransactionsWindow &&
        selectedSupplier &&
        selectedSupplier.id && (
          <CreateSupplierTransactions />
        )}

      {selectedDateWindow && (
        <DatePickerWindow
          closeWindow={handleSelectedDateWindow}
          loading={loading}
          selectDate={handleSelectedDate}
          selectedDate={selectedDate}
        />
      )}
      {newEventSupplierTransactionAgreement && (
        <NewEventSupplierTransactionAgreementConfirmation />
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
            {currentSection === 'Suppliers' && (
              <SuppliersSection />
            )}
            {currentSection === 'Financial' && (
              <FinancialSection />
            )}
          </BodyContainer>
        </Body>
      </Container>
    </>
  );
};

export default MyEvent;
