import React, { useEffect } from 'react';

import { useMyEvent } from '../../../../hooks/myEvent';
import { useEventTasks } from '../../../../hooks/eventTasks';
import { useEventSuppliers } from '../../../../hooks/eventSuppliers';
import { useNote } from '../../../../hooks/notes';
import { useTransaction } from '../../../../hooks/transactions';
import { useFiles } from '../../../../hooks/files';
import { useEventOwners } from '../../../../hooks/eventOwners';
import { useEventMembers } from '../../../../hooks/eventMembers';
import { useEventVariables } from '../../../../hooks/eventVariables';
import { useUserContacts } from '../../../../hooks/userContacts';
import { useEventGuests } from '../../../../hooks/eventGuests';

import { SelectSupplierCategory } from '../../components/SuppliersComponents/SelectSupplierCategory';
import { SelectSupplierSubCategory } from '../../components/SuppliersComponents/SelectSupplierSubCategory';
import NewSupplierForm from '../../components/SuppliersComponents/NewSupplierForm';
import { BudgetWindow } from '../../components/BudgetWindow';
import { FinancialSection } from '../../components/FinancialComponents/FinancialSection';
import { MainMenu } from '../../components/MainMenu';
import NewGuestForm from '../../components/EventGuestComponents/NewGuestForm';
import PageHeader from '../../../../components/PageHeader';
import GuestsSection from '../../components/EventGuestComponents/GuestsSection';
import { TasksSection } from '../../components/EventTaskComponents/TasksSection';
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
import { GuestFilterWindow } from '../../components/EventGuestComponents/GuestFilterWindow';
import { TransactionsFilterWindow } from '../../components/FinancialComponents/TransactionsFilterWindow';
import { NewGuestWindow } from '../../components/EventGuestComponents/NewGuestWindow';
import { SelectMobileContacts } from '../../../../components/ContactComponents/SelectMobileContacts';
import { CreateEventTransaction } from '../../../../components/TransactionComponents/CreateEventTransaction';

import { EditSupplierName } from '../../components/SuppliersComponents/EditSupplierName';
import { EditSupplierCategory } from '../../components/SuppliersComponents/EditSupplierCategory';
import { EventNotesSection } from '../../components/EventNotesComponents/EventNotesSection';
import { SupplierNotesSection } from '../../components/SuppliersComponents/SupplierNotesWindow';
import { TransactionNotesWindow } from '../../../../components/TransactionComponents/TransactionNotesWindow';
import { TransactionFilesWindow } from '../../../../components/TransactionComponents/TransactionFilesWindow';
import { EventSupplierFilesWindow } from '../../components/SuppliersComponents/EventSupplierFilesWindow';
import { EventSupplierBudgetsWindow } from '../../components/SuppliersComponents/EventSupplierBudgetsWindow';
import { EventSupplierBudgetForm } from '../../components/SuppliersComponents/EventSupplierBudgetForm';
import { EditSupplierBudgetAmount } from '../../components/SuppliersComponents/EditSupplierBudgetAmount';
import { EditSupplierBudgetDescription } from '../../components/SuppliersComponents/EditSupplierBudgetDescription';
import { EditFileNameWindow } from '../../../../components/FilesComponents/EditFileNameWindow';
import { SelectFromFriends } from '../../../../components/FriendsComponents/SelectFromFriends';
import { EventTaskFollowersWindow } from '../../components/EventTaskComponents/EventTaskFollowersWindow';
import { AddEventTaskFollowersWindow } from '../../components/EventTaskComponents/AddEventTaskFollowersWindow';
import { EventTaskFollowersDescriptionWindow } from '../../components/EventTaskComponents/EventTaskFollowersDescriptionWindow';
import { UserEventTasksWindow } from '../../components/EventTaskComponents/UserEventTasksWindow';
import { SelectOneFromFriends } from '../../../../components/FriendsComponents/SelectOneFromFriends';
import { CreateGuestContactWindow } from '../../components/EventGuestComponents/CreateGuestContactWindow';

import {
  Container,
  EventName,
  Body,
  DashboardButton,
  BodyContainer,
} from './styles';

import IEventDTO from '../../../../dtos/IEventDTO';
import { WPFriendContactWindow } from '../../../../components/WPFriendContactWindow';
import { useFriends } from '../../../../hooks/friends';
import { CreateTransactionAgreement } from '../../../../components/CreateTransactionAgreement';
import { SelectedEventTransactionAgreementsWindow } from '../../../../components/SelectedEventAgreementTransactionsWindow';
import { NewEventTransactionAgreementConfirmation } from '../../../../components/NewEventTransactionAgreementConfirmation';
import { EventTransactionsWindow } from '../../../../components/EventTransactionsWindow';
import { EventMonthlyPaymentAgreementsWindow } from '../../../../components/EventMonthlyPaymentAgreementsWindow';
import { SelectMonthlyPaymentAgreementParticipant } from '../../../../components/SelectMonthlyPaymentAgreementParticipant';
import { CreateEventMonthlyPaymentAgrements } from '../../../../components/CreateEventMonthlyPaymentAgrements';
import { NewEventMonthlyPaymentConfirmation } from '../../../../components/NewEventMonthlyPaymentConfirmation';
import { EventMonthlyPaymentSettings } from '../../../../components/EventMonthlyPaymentSettings';
import { EventDashboardSection } from '../../components/EventDashboardSection';

const MyEvent: React.FC = () => {
  const {
    currentSection,
    selectEventSection,
    budgetWindow,
    calculateTotalEventCost,
    sectionDescriptionWindow,
    handleSelectedEvent,
  } = useMyEvent();
  const { selectedUserContact } = useFriends();
  const {
    eventSuppliers,
    selectedEvent,
    selectedEventSupplier,
    selectedEventTask,
    selectedEventTaskFollower,
    eventMonthlyPaymentSettingsWindow,
    selectedEventGuest,
    selectedEventOwner,
    selectedEventMember,
    monthlyPaymentWindow,
    selectMonthlyPaymentAgreementParticipantWindow,
    newEventMonthlyPaymentConfirmation,
    createMonthlyPaymentAgreementWindow,
    handleSelectedDateWindow,
    handleSelectedDate,
    selectedDate,
    selectedDateWindow,
  } = useEventVariables();
  const {
    loading,
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
    handleEditTaskDateWindow,
    handleEditTaskTimeWindow,
    handleSelectTaskDateWindow,
    handleSelectTaskTimeWindow,
    handleEventTaskNotesWindow,
    handleCreateTaskWindow,
    handleDeleteTaskConfirmationWindow,
    updateTask,
    deleteTask,
    eventTaskFollowersWindow,
    createEventTaskFollowersWindow,
    handleDeleteTaskFollowerConfirmation,
    deleteTaskFollowerConfirmation,
    deleteTaskFollower,
    eventTaskFollowersDescriptionWindow,
    userEventTasksWindow,
    handleUserEventTasksWindow,
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
    editSupplierNameWindow,
    editSupplierCategoryWindow,
    supplierTransactionAgreementsWindow,
    handleSupplierTransactionAgreementsWindow,
    handleCreateSupplierTransactionAgreementWindow,
    supplierNotesWindow,
    supplierFilesWindow,
    supplierBudgetsWindow,
    supplierBudgetForm,
    selectedSupplierBudget,
    editSupplierBudgetAmountWindow,
    editSupplierBudgetDescriptionWindow,
    supplierSelectedDateWindow,
    supplierSelectedDate,
    updateSupplierBudgetDueDate,
    handleSupplierSelectedDateWindow,
    createEventWePlanSupplierTaskWindow,
    handleCreateEventWePlanSupplierTaskWindow,
    eventWePlanSupplierTaskWindow,
    handleEventWePlanSupplierTaskWindow,
  } = useEventSuppliers();
  const {
    guestFilterWindow,
    newGuestForm,
    newGuestWindow,
    selectWePlanGuestsWindow,
    handleSelectWePlanGuestsWindow,
    createMultipleWePlanGuests,
    handleSelectWePlanGuestWindow,
    selectWePlanGuestWindow,
    dissociateUserFromGuestConfirmation,
    deleteWePlanGuest,
    handleDissociateUserFromGuestConfirmation,
    associateUserToEventGuest,
    createGuestContactWindow,
    deleteGuestConfirmationWindow,
    handleDeleteGuestConfirmationWindow,
    deleteGuest,
  } = useEventGuests();
  const {
    editNoteWindow,
    selectNote,
    handleEditNoteWindow,
  } = useNote();
  const { editFileWindow } = useFiles();
  const {
    handleAddOwnerWindow,
    addOwnerWindow,
    addMultipleOwners,
    createEventOwnerTransactionAgreement,
    handleCreateEventOwnerTransactionAgreement,
    eventOwnerTransactionAgreementsWindow,
    handleEventOwnerTransactionAgreementsWindow,
    newOwnerTransactionAgreementConfirmation,
    handleNewOwnerTransactionAgreementConfirmation,
    createEventOwnerTaskWindow,
    handleCreateEventOwnerTaskWindow,
    eventOwnerTaskWindow,
    handleEventOwnerTaskWindow,
  } = useEventOwners();
  const {
    handleAddMemberWindow,
    addMemberWindow,
    addMultipleMembers,
    createEventMemberTransactionAgreement,
    handleCreateEventMemberTransactionAgreement,
    eventMemberTransactionAgreementsWindow,
    handleEventMemberTransactionAgreementsWindow,
    newMemberTransactionAgreementConfirmation,
    handleNewMemberTransactionAgreementConfirmation,
    createEventMemberTaskWindow,
    eventMemberTaskWindow,
    handleCreateEventMemberTaskWindow,
    handleEventMemberTaskWindow,
  } = useEventMembers();
  const {
    cancelEventTransaction,
    cancelEventTransactionConfirmationWindow,
    filterTransactionWindow,
    handleCancelEventTransactionConfirmationWindow,
    handleUpdateTransactionDueDate,
    newEventSupplierTransactionAgreement,
    handleNewEventSupplierTransactionAgreement,
    selectedEventTransaction,
    createTransactionWindow,
    editEventTransactionValueWindow,
    transactionNotesWindow,
    transactionFilesWindow,
    selectedEventTransactionAgreement,
    handleEventTransactionsWindow,
    eventTransactionsWindow,
  } = useTransaction();
  const { selectMobileContactsWindow, mobileContacts } = useUserContacts();

  function handleUnsetVariables() {
    handleSelectedEvent({} as IEventDTO);
  }

  async function handleUpdateTaskDate(date: Date) {
    await updateTask({
      ...selectedEventTask.task,
      due_date: date,
    });
    handleEditTaskDateWindow();
  }

  async function handleUpdateTaskTime(date: Date) {
    await updateTask({
      ...selectedEventTask.task,
      due_date: date,
    });
    handleEditTaskTimeWindow();
  }

  async function handleDeleteTask() {
    await deleteTask(selectedEventTask);
    handleDeleteTaskConfirmationWindow();
  }

  async function handleDeleteGuest() {
    try {
      await deleteGuest(selectedEventGuest);
    } catch {
      throw new Error();
    } finally {
      handleDeleteGuestConfirmationWindow();
    }
  }

  useEffect(() => {
    calculateTotalEventCost();
  }, [calculateTotalEventCost, eventSuppliers]);

  return (
    <>
      {budgetWindow && <BudgetWindow />}
      {eventMonthlyPaymentSettingsWindow && <EventMonthlyPaymentSettings />}
      {monthlyPaymentWindow && <EventMonthlyPaymentAgreementsWindow />}
      {editFileWindow && <EditFileNameWindow />}
      {supplierNotesWindow && <SupplierNotesSection />}
      {supplierFilesWindow && <EventSupplierFilesWindow />}
      {supplierBudgetsWindow && <EventSupplierBudgetsWindow />}
      {supplierBudgetForm && <EventSupplierBudgetForm />}
      {transactionNotesWindow && <TransactionNotesWindow />}
      {transactionFilesWindow && <TransactionFilesWindow />}
      {eventTaskFollowersWindow && <EventTaskFollowersWindow />}
      {createEventTaskFollowersWindow && <AddEventTaskFollowersWindow />}
      {selectMonthlyPaymentAgreementParticipantWindow && (
        <SelectMonthlyPaymentAgreementParticipant />
      )}
      {createMonthlyPaymentAgreementWindow && (
        <CreateEventMonthlyPaymentAgrements />
      )}
      {newEventMonthlyPaymentConfirmation && (
        <NewEventMonthlyPaymentConfirmation />
      )}
      {selectWePlanGuestsWindow &&
        <SelectFromFriends
          closeWindow={handleSelectWePlanGuestsWindow}
          handleAddFriends={createMultipleWePlanGuests}
        />
      }
      {eventOwnerTransactionAgreementsWindow && (
        <SelectedEventTransactionAgreementsWindow
          handleCreateAgreementWindow={handleCreateEventOwnerTransactionAgreement}
          agreement_type="owner"
          closeWindow={handleEventOwnerTransactionAgreementsWindow}
          overTitle="Anfitrião"
          title={selectedEventOwner.userEventOwner.name}
        />
      )}
      {createEventOwnerTransactionAgreement && (
        <CreateTransactionAgreement
          nextWindow={handleNewOwnerTransactionAgreementConfirmation}
          closeWindow={handleCreateEventOwnerTransactionAgreement}
        />
      )}
      {newOwnerTransactionAgreementConfirmation && (
        <NewEventTransactionAgreementConfirmation
          overTitle="Contrato com Anfitrião"
          title={selectedEventOwner.userEventOwner.name}
          participant_id={selectedEventOwner.id}
          participant_type="owner"
          closeWindow={handleNewOwnerTransactionAgreementConfirmation}
          closePreviousWindow={handleCreateEventOwnerTransactionAgreement}
        />
      )}
      {eventMemberTransactionAgreementsWindow && (
        <SelectedEventTransactionAgreementsWindow
          handleCreateAgreementWindow={handleCreateEventMemberTransactionAgreement}
          agreement_type="member"
          closeWindow={handleEventMemberTransactionAgreementsWindow}
          overTitle="Membro"
          title={selectedEventMember.userEventMember.name}
        />
      )}
      {createEventMemberTransactionAgreement && (
        <CreateTransactionAgreement
          nextWindow={handleNewMemberTransactionAgreementConfirmation}
          closeWindow={handleCreateEventMemberTransactionAgreement}
        />
      )}
      {newMemberTransactionAgreementConfirmation && (
        <NewEventTransactionAgreementConfirmation
          overTitle="Contrato com Membro"
          title={selectedEventMember.userEventMember.name}
          participant_id={selectedEventMember.id}
          participant_type="member"
          closeWindow={handleNewMemberTransactionAgreementConfirmation}
          closePreviousWindow={handleCreateEventMemberTransactionAgreement}
        />
      )}
      {selectedUserContact && selectedUserContact.id && (
        <WPFriendContactWindow />
      )}
      {eventOwnerTaskWindow && (
        <UserEventTasksWindow
          closeWindow={handleEventOwnerTaskWindow}
          createTaskWindow={handleCreateEventOwnerTaskWindow}
        />
      )}
      {eventMemberTaskWindow && (
        <UserEventTasksWindow
          closeWindow={handleEventMemberTaskWindow}
          createTaskWindow={handleCreateEventMemberTaskWindow}
        />
      )}
      {eventWePlanSupplierTaskWindow && (
        <UserEventTasksWindow
          closeWindow={handleEventWePlanSupplierTaskWindow}
          createTaskWindow={handleCreateEventWePlanSupplierTaskWindow}
        />
      )}
      {userEventTasksWindow && (
        <UserEventTasksWindow
          closeWindow={handleUserEventTasksWindow}
          createTaskWindow={handleCreateTaskWindow}
        />
      )}
      {addOwnerWindow &&
        <SelectFromFriends
          closeWindow={handleAddOwnerWindow}
          handleAddFriends={addMultipleOwners}
        />
      }
      {addMemberWindow &&
        <SelectFromFriends
          closeWindow={handleAddMemberWindow}
          handleAddFriends={addMultipleMembers}
        />
      }
      {createGuestContactWindow && (
        <CreateGuestContactWindow />
      )}
      {selectWePlanGuestWindow && selectedEventGuest && (
        <SelectOneFromFriends
          closeWindow={handleSelectWePlanGuestWindow}
          handleAddFriend={associateUserToEventGuest}
        />
      )}
      {dissociateUserFromGuestConfirmation && (
        <ShortConfirmationWindow
          closeWindow={handleDissociateUserFromGuestConfirmation}
          firstButtonLabel="Deletar"
          firstFunction={deleteWePlanGuest}
          question="Deseja mesmo dissociar o usuário do convidado?"
          secondButtonLabel="Não deletar"
          secondFunction={handleDissociateUserFromGuestConfirmation}
        />
      )}
      {editSupplierBudgetDescriptionWindow
        && selectedSupplierBudget
        && selectedSupplierBudget.id
        && <EditSupplierBudgetDescription />}
      {editSupplierBudgetAmountWindow
        && selectedSupplierBudget
        && selectedSupplierBudget.id
        && <EditSupplierBudgetAmount />}
      {supplierSelectedDateWindow
        && selectedSupplierBudget
        && selectedSupplierBudget.id
        && (
          <DatePickerWindow
            closeWindow={handleSupplierSelectedDateWindow}
            selectDate={updateSupplierBudgetDueDate}
            selectedDate={new Date(supplierSelectedDate)}
          />
        )}
      {selectedEventSupplier
        && selectedEventSupplier.id
        && editSupplierNameWindow
        && <EditSupplierName />}
      {selectedEventSupplier
        && selectedEventSupplier.id
        && editSupplierCategoryWindow
        && <EditSupplierCategory />}
      {eventTransactionsWindow && (
        <EventTransactionsWindow
          closeWindow={handleEventTransactionsWindow}
          overTitle="Transações"
          title={selectedEventTransactionAgreement.participant_name ?? 'Do Evento'}
          transactions={selectedEventTransactionAgreement.transactions}
        />
      )}
      {supplierTransactionAgreementsWindow && (
        <SelectedEventTransactionAgreementsWindow
          agreement_type="supplier"
          closeWindow={handleSupplierTransactionAgreementsWindow}
          handleCreateAgreementWindow={handleCreateSupplierTransactionAgreementWindow}
          overTitle="Fornecedor"
          title={selectedEventSupplier.name}
        />
      )}
      {selectMobileContactsWindow && mobileContacts.length > 0 && (
        <SelectMobileContacts />
      )}
      {createTransactionWindow && <CreateEventTransaction />}
      {sectionDescriptionWindow && <SectionDescriptionWindow />}
      {eventTaskFollowersDescriptionWindow && <EventTaskFollowersDescriptionWindow />}
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
      {selectedEventSupplier
        && selectedEventSupplier.id
        && supplierTransactionsWindow && (
          <SupplierTransactionsWindow />
        )
      }
      {selectedEventSupplier
        && selectedEventSupplier.id
        && cancelAgreementsWindow && (
          <CancelAllAgreements />
        )
      }
      {dischargingWindow && <DischargeSupplierWindow />}
      {newGuestForm && <NewGuestForm />}
      {newGuestWindow && <NewGuestWindow />}
      {editTaskPriorityWindow
        && selectedEventTask
        && selectedEventTask.id && (
          <EditTaskPriorityWindow />
      )}
      {editTaskStatusWindow
        && selectedEventTask
        && selectedEventTask.id && (
          <EditTaskStatusWindow />
      )}
      {editTaskDateWindow
        && selectedEventTask
        && selectedEventTask.id && (
          <DatePickerWindow
            loading={loading}
            closeWindow={handleEditTaskDateWindow}
            selectDate={handleUpdateTaskDate}
            selectedDate={new Date(selectedEventTask.task.due_date)}
          />
      )}
      {editTaskTimeWindow
        && selectedEventTask
        && selectedEventTask.id && (
          <TimePickerWindow
            loading={loading}
            closeWindow={handleEditTaskTimeWindow}
            selectDate={handleUpdateTaskTime}
            selectedDate={new Date(selectedEventTask.task.due_date)}
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
        && selectedEventTask
        && selectedEventTask.id && (
          <EditTaskStatusWindow />
      )}
      {eventTaskNotesWindow
        && selectedEventTask
        && selectedEventTask.id && (
          <EventTaskNotesWindow
            closeWindow={handleEventTaskNotesWindow}
          />
      )}
      {createTaskWindow && (
        <NewTaskForm closeWindow={handleCreateTaskWindow} />
      )}
      {createEventOwnerTaskWindow && (
        <NewTaskForm closeWindow={handleCreateEventOwnerTaskWindow} />
      )}
      {createEventMemberTaskWindow && (
        <NewTaskForm closeWindow={handleCreateEventMemberTaskWindow} />
      )}
      {createEventWePlanSupplierTaskWindow && (
        <NewTaskForm closeWindow={handleCreateEventWePlanSupplierTaskWindow} />
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
      {selectedEventTaskFollower && deleteTaskFollowerConfirmation && (
        <ShortConfirmationWindow
          closeWindow={handleDeleteTaskFollowerConfirmation}
          question="Deseja mesmo deletar o seguidor?"
          firstButtonLabel="Não deletar"
          firstFunction={handleDeleteTaskFollowerConfirmation}
          secondButtonLabel="Deletar"
          secondFunction={deleteTaskFollower}
        />
      )}
      {deleteGuestConfirmationWindow && (
        <ShortConfirmationWindow
          closeWindow={handleDeleteGuestConfirmationWindow}
          question="Deseja mesmo deletar o convidado?"
          firstButtonLabel="Não deletar"
          firstFunction={handleDeleteGuestConfirmationWindow}
          secondButtonLabel="Deletar"
          secondFunction={handleDeleteGuest}
        />
      )}
      {editNoteWindow && (
        <EditNoteWindow closeWindow={handleEditNoteWindow} />
      )}
      {addSupplierWindow && (
        <NewSupplierForm closeWindow={handleAddSupplierWindow} />
      )}
      {supplierCategoryWindow && <SelectSupplierCategory />}
      {supplierSubCategoryWindow && <SelectSupplierSubCategory />}
      {createSupplierTransactionAgreementWindow &&
        selectedEventSupplier &&
        selectedEventSupplier.id && (
          <CreateTransactionAgreement
            closeWindow={handleCreateSupplierTransactionAgreementWindow}
            nextWindow={handleNewEventSupplierTransactionAgreement}
          />
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
        <NewEventTransactionAgreementConfirmation
          closeWindow={handleNewEventSupplierTransactionAgreement}
          overTitle="Contrato com Fornecedor"
          participant_id={selectedEventSupplier.id}
          participant_type="supplier"
          title={selectedEventSupplier.name}
          closePreviousWindow={handleCreateSupplierTransactionAgreementWindow}
        />
      )}
      <Container>
        <PageHeader unsetVariables={handleUnsetVariables} >
          <DashboardButton onPress={() => selectEventSection('Tasks')}>
            <EventName>{selectedEvent.name}</EventName>
          </DashboardButton>
        </PageHeader>
        <Body>
          <BodyContainer>
            {currentSection === 'Dashboard' && <EventDashboardSection />}
            {currentSection === 'Notes' && <EventNotesSection />}
            {currentSection === 'Guests' && <GuestsSection />}
            {currentSection === 'Tasks' && <TasksSection />}
            {currentSection === 'Suppliers' && <SuppliersSection />}
            {currentSection === 'Financial' && <FinancialSection />}
            {currentSection === 'Members' && <MembersSection />}
            {currentSection === 'Owners' && <OwnersSection />}
          </BodyContainer>
          <MainMenu />
        </Body>
      </Container>
    </>
  );
};

export default MyEvent;
