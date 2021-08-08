import React, { useEffect } from 'react';

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
import { DischargeSupplierWindow } from '../../components/SuppliersComponents/DischargeSupplierWindow';
import { CancelAllAgreements } from '../../components/SuppliersComponents/CancelAllAgreements';
import { SupplierTransactionsWindow } from '../../components/SuppliersComponents/SupplierTransactionsWindow';
import { EventSupplierAgreementTransactionsWindow } from '../../components/FinancialComponents/EventSupplierAgreementTransactionsWindow';
import { MembersSection } from '../../components/MembersComponents/MembersSection';
import { OwnersSection } from '../../components/OwnersComponents/OwnersSection';
import { SectionDescriptionWindow } from '../../components/OwnersComponents/SectionDescriptionWindow';
import { useEventGuests } from '../../../../hooks/eventGuests';
import { GuestFilterWindow } from '../../components/EventGuestComponents/GuestFilterWindow';
import { TransactionsFilterWindow } from '../../components/FinancialComponents/TransactionsFilterWindow';
import { useUnsetEventVariables } from '../../../../hooks/unsetEventVariables';
import { useUserContacts } from '../../../../hooks/userContacts';
import { NewGuestWindow } from '../../components/EventGuestComponents/NewGuestWindow';
import { SelectMobileContacts } from '../../../../components/ContactComponents/SelectMobileContacts';
import { EditTransactionName } from '../../../../components/TransactionComponents/EditTransactionName';
import { CreateEventTransaction } from '../../../../components/TransactionComponents/CreateEventTransaction';
import { EditTransactionAmount } from '../../components/FinancialComponents/EditTransactionAmount';
import { EditTransactionCategory } from '../../../../components/TransactionComponents/EditTransactionCategory';

import {
  Container,
  EventName,
  Body,
  DashboardButton,
  BodyContainer,
} from './styles';

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
    sectionDescriptionWindow,
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
    cancelAgreementsWindow,
    dischargingWindow,
    supplierCategoryWindow,
    supplierSubCategoryWindow,
    createSupplierTransactionAgreementWindow,
    handleAddSupplierWindow,
    supplierTransactionsWindow,
    selectedSupplierTransactionAgreement,
    eventSupplierAgreementTransactionsWindow,
  } = useEventSuppliers();
  const {
    guestFilterWindow,
    newGuestForm,
    newGuestWindow,
  } = useEventGuests();
  const { editNoteWindow, selectNote, handleEditNoteWindow } = useNote();
  const {
    cancelEventTransaction,
    cancelEventTransactionConfirmationWindow,
    editTransactionName,
    editTransactionCategory,
    filterTransactionWindow,
    handleCancelEventTransactionConfirmationWindow,
    handleSelectedDateWindow,
    handleSelectedDate,
    handleUpdateTransactionDueDate,
    newEventSupplierTransactionAgreement,
    selectedDate,
    selectedDateWindow,
    selectedEventTransaction,
    createTransactionWindow,
    editEventTransactionValueWindow,
  } = useTransaction();
  const { selectMobileContactsWindow } = useUserContacts();
  const { unsetVariables } = useUnsetEventVariables();

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

  async function handleDeleteTask() {
    await deleteTask(selectedTask);
    handleDeleteTaskConfirmationWindow();
  }

  useEffect(() => {
    calculateTotalEventCost();
  }, [calculateTotalEventCost, eventSuppliers]);

  return (
    <>
      {budgetWindow && <BudgetWindow />}

      {selectedEventTransaction
        && selectedEventTransaction.transaction
        && editTransactionName
        && <EditTransactionName />}

      {selectedEventTransaction
        && selectedEventTransaction.transaction
        && editTransactionCategory
        && <EditTransactionCategory />}

      {selectMobileContactsWindow && <SelectMobileContacts />}

      {createTransactionWindow && <CreateEventTransaction />}

      {sectionDescriptionWindow && <SectionDescriptionWindow />}


      {guestFilterWindow && <GuestFilterWindow />}

      {filterTransactionWindow && <TransactionsFilterWindow /> }

      {selectedEventTransaction
        && selectedEventTransaction.transaction
        && cancelEventTransactionConfirmationWindow && (
          <ShortConfirmationWindow
            closeWindow={handleCancelEventTransactionConfirmationWindow}
            question="Deseja deletar a transação? O contrato também será alterado."
            firstButtonLabel="Deletar"
            firstFunction={cancelEventTransaction}
            secondButtonLabel="Cancelar"
            secondFunction={handleCancelEventTransactionConfirmationWindow}
            left="0%"
            backdropLeft="0%"
          />
        )}

      {selectedSupplierTransactionAgreement
        && selectedSupplierTransactionAgreement.id
        && eventSupplierAgreementTransactionsWindow && (
          <EventSupplierAgreementTransactionsWindow />
        )}

      {selectedSupplier
        && selectedSupplier.id
        && supplierTransactionsWindow && (
          <SupplierTransactionsWindow />
        )
      }

      {selectedSupplier
        && selectedSupplier.id
        && cancelAgreementsWindow && (
          <CancelAllAgreements />
        )
      }

      {dischargingWindow && <DischargeSupplierWindow />}

      {newGuestForm && <NewGuestForm />}
      {newGuestWindow && <NewGuestWindow />}

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

      {createTaskWindow && <NewTaskForm closeWindow={handleCreateTaskWindow} />}

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

      {supplierCategoryWindow && <SelectSupplierCategory />}

      {supplierSubCategoryWindow && <SelectSupplierSubCategory />}

      {createSupplierTransactionAgreementWindow &&
        selectedSupplier &&
        selectedSupplier.id && (
          <CreateSupplierTransactionAgreement />
        )}

      {editEventTransactionValueWindow && (
        <EditTransactionAmount />
      )}
      {selectedDateWindow && (
        <DatePickerWindow
          closeWindow={handleSelectedDateWindow}
          loading={loading}
          selectDate={handleSelectedDate}
          selectedDate={selectedDate}
        />
      )}
      {selectedDateWindow
        && selectedEventTransaction
        && selectedEventTransaction.transaction && (
          <DatePickerWindow
            closeWindow={handleSelectedDateWindow}
            loading={loading}
            selectDate={handleUpdateTransactionDueDate}
            selectedDate={selectedDate}
          />
        )}
      {newEventSupplierTransactionAgreement && (
        <NewEventSupplierTransactionAgreementConfirmation />
      )}

      <Container>
        <PageHeader unsetVariables={unsetVariables} >
          <DashboardButton onPress={() => selectEventSection('Tasks')}>
            <EventName>{selectedEvent.name}</EventName>
          </DashboardButton>
        </PageHeader>
        <Body>
          <MainMenu />
          <BodyContainer>
            {currentSection === 'Guests' && <GuestsSection />}
            {currentSection === 'Tasks' && <TasksSection />}
            {currentSection === 'Suppliers' && <SuppliersSection />}
            {currentSection === 'Financial' && <FinancialSection />}
            {currentSection === 'Members' && <MembersSection />}
            {currentSection === 'Owners' && <OwnersSection />}
          </BodyContainer>
        </Body>
      </Container>
    </>
  );
};

export default MyEvent;
