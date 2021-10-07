import React, {
  useContext,
  createContext,
  useState,
  useCallback,
} from 'react';

import api from '../services/api';

import { useAuth } from './auth';

import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IEventSupplierDTO from '../dtos/IEventSupplierDTO';
import IEventDTO from '../dtos/IEventDTO';
import IEventTaskDTO from '../dtos/IEventTaskDTO';
import IEventBudgetDTO from '../dtos/IEventBudgetDTO';
import IEventSupplierTransactionAgreementDTO from '../dtos/IEventSupplierTransactionAgreementDTO';
import IEventNoteDTO from '../dtos/IEventNoteDTO';
import IEventTransactionDTO from '../dtos/IEventTransactionDTO';
import { Alert } from 'react-native';
import { useEvent } from './event';
import { useEventVariables } from './eventVariables';
import IEventMonthlyPaymentAgreementDTO from '../dtos/IEventMonthlyPaymentAgreementDTO';

interface MyEventContextType {
  eventFinancialSubSection: string;
  budgetWindow: boolean;
  backdropSearch: boolean;
  loading: boolean;
  hiredSuppliers: IEventSupplierDTO[];
  dischargedSuppliers: IEventSupplierDTO[];
  notHiredSuppliers: IEventSupplierDTO[];
  myGuests: IEventGuestDTO[];
  numberOfGuests: number;
  myGuestsConfirmed: number;
  confirmedGuests: number;
  myNumberOfGuests: number;
  availableNumberOfGuests: number;
  totalEventCost: number;
  isOwner: boolean;
  currentSection: string;
  sectionDescriptionWindow: boolean;
  deleteEventConfirmationWindow: boolean;
  handleSelectedEvent: (data: IEventDTO) => Promise<void>;
  handleEventFinancialSubSection: (data: string) => void;
  handleBudgetWindow: () => void;
  handleDeleteEventConfirmationWindow: () => void;
  handleSectionDescriptionWindow: () => void;
  handleBackdropSearch: () => void;
  getEventGuests: (eventId: string) => Promise<void>;
  getEventOwners: (event_id: string) => Promise<void>;
  getEventMembers: (event_id: string) => Promise<void>;
  getEventMonthlyPaymentAgreements: (event_id: string) => Promise<void>;
  getEventSuppliers: (event_id: string) => Promise<void>;
  calculateTotalEventCost: () => void;
  selectEventSection: (e: string) => void;
  getEvent: (eventId: string) => Promise<void>;
  getEventNotes: (eventId: string) => Promise<void>;
  getEventTasks: (eventId: string) => Promise<void>;
  getSelectedUserEventTasks: (user_id: string) => Promise<IEventTaskDTO[]>;
  getEventBudget: (eventId: string) => Promise<void>;
  getEventTransactions: (eventId: string) => Promise<void>;
  createEventBudget: (budget: number) => Promise<void>;
  updateEventBudget: (data: IEventBudgetDTO) => Promise<void>;
  unsetEventVariables: () => void;
  handleDeleteEvent: () => void;
}

const MyEventContext = createContext({} as MyEventContextType);

const MyEventProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const {
    getEventsAsGuest,
    getEventsAsMember,
    getEventsAsOwner,
    getNextEvent,
    nextEvent,
  } = useEvent();
  const {
    selectEvent,
    selectedEvent,
    selectEventGuest,
    selectedEventMember,
    selectEventMember,
    selectedEventOwner,
    selectEventOwner,
    selectEventTask,
    selectedEventTask,
    selectEventSupplier,
    selectedEventSupplier,
    handleEventBudget,
    handleSelectedUserEventTasks,
    handleEventGuests,
    handleEventSuppliers,
    handleEventOwners,
    handleEventMembers,
    handleEventMonthlyPaymentAgreements,
    selectEventMonthlyPaymentAgreement,
    selectedEventMonthlyPaymentAgreement,
    handleEventNotes,
    handleEventTasks,
    handleEventTransactions,
    handleEventSupplierTransactionAgreements,
    eventMembers,
    eventGuests,
    eventOwners,
    selectedEventGuest,
    handleFilteredGuests,
    unsetVariables,
  } = useEventVariables();

  const [eventFinancialSubSection, setEventFinancialSubSection] = useState('Main');
  const [loading, setLoading] = useState(false);
  const [deleteEventConfirmationWindow, setDeleteEventConfirmationWindow] = useState(false);
  const [backdropSearch, setBackdropSearch] = useState(false);
  const [budgetWindow, setBudgetWindow] = useState(false);
  const [sectionDescriptionWindow, setSectionDescriptionWindow] = useState(false);
  const [hiredSuppliers, setHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [dischargedSuppliers, setDischargedSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [notHiredSuppliers, setNotHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [myGuests, setMyGuests] = useState<IEventGuestDTO[]>([]);
  const [myGuestsConfirmed, setMyGuestsConfirmed] = useState(0);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [myNumberOfGuests, setMyNumberOfGuests] = useState(0);
  const [availableNumberOfGuests, setAvailableNumberOfGuests] = useState(0);
  const [totalEventCost, setTotalEventCost] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [currentSection, setCurrentSection] = useState('Notes');

  const calculateTotalEventCost = useCallback(() => {
    const totalCost: number = hiredSuppliers
      .map((supplier) => {
        let cost = 0;
        if (supplier.transactionAgreements) {
          cost = supplier.transactionAgreements
            .filter(agreement => !agreement.isCancelled)
            .map((agreement) => Number(agreement.amount))
            .reduce((a, b) => a + b, 0);
        }
        return cost;
      })
      .reduce((a, b) => a + b, 0);
    setTotalEventCost(totalCost);
  }, [hiredSuppliers]);

  function handleEventFinancialSubSection(data: string) {
    setEventFinancialSubSection(data);
  }

  async function handleDeleteEventConfirmationWindow() {
    if (deleteEventConfirmationWindow === true) await selectEvent({} as IEventDTO);
    setDeleteEventConfirmationWindow(!deleteEventConfirmationWindow);
  }

  function unsetEventVariables() {
    setHiredSuppliers([]);
    setDischargedSuppliers([]);
    setNotHiredSuppliers([]);
    setMyGuests([]);
    setNumberOfGuests(0);
    setMyNumberOfGuests(0);
    setMyGuestsConfirmed(0);
    setConfirmedGuests(0);
    setIsOwner(false);
    setTotalEventCost(0);
    setAvailableNumberOfGuests(0);
    unsetVariables();
  }

  function handleBudgetWindow() {
    setBudgetWindow(!budgetWindow);
  }

  function handleSectionDescriptionWindow() {
    setSectionDescriptionWindow(!sectionDescriptionWindow);
  }

  function handleBackdropSearch() {
    setBackdropSearch(!backdropSearch);
  }

  function selectEventSection(e: string) {
    setCurrentSection(e);
  }

  async function getEventTransactions(eventId: string) {
    try {
      const transactions = await api.get<IEventTransactionDTO[]>(`/list-event-transactions/${eventId}`);

      handleEventTransactions(transactions.data
        .sort((a, b) => {
          if (new Date(a.transaction.due_date) > new Date(b.transaction.due_date)) return 1;
          if (new Date(a.transaction.due_date) < new Date(b.transaction.due_date)) return -1;
          return 0;
        })
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventSuppliers(event_id: string) {
    try {
      const response = await api.get<IEventSupplierDTO[]>(`/event-suppliers/${event_id}`);
      if (selectedEventSupplier && selectedEventSupplier.id) {
        const findSupplier = response.data.find(supplier => supplier.id === selectedEventSupplier.id);
        findSupplier && selectEventSupplier(findSupplier);
      }
      handleEventSuppliers(response.data);
      const agreements: IEventSupplierTransactionAgreementDTO[] = [];
      response.data.map(supplier => {
        supplier.transactionAgreements.map(agreement => !agreement.isCancelled && agreements.push(agreement));
        return supplier;
      });
      handleEventSupplierTransactionAgreements(agreements);
      const newNotHired = response.data.filter((selected) => !selected.isHired && !selected.isDischarged);
      const newHired = response.data.filter((selected) => selected.isHired && !selected.isDischarged);
      const newDischarged = response.data.filter((selected) => selected.isDischarged);
      setNotHiredSuppliers(newNotHired);
      setHiredSuppliers(newHired);
      setDischargedSuppliers(newDischarged);
      if (selectedEventSupplier && selectedEventSupplier.id) {
        const updatedSupplier = response.data.find(supplier => supplier.id === selectedEventSupplier.id);
        updatedSupplier && selectEventSupplier(updatedSupplier);
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      calculateTotalEventCost();
    }
  }
  async function getEventBudget(eventId: string) {
    try {
      const response = await api.get<IEventBudgetDTO>(`/event-budget/${eventId}`);
      handleEventBudget(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getSelectedUserEventTasks(user_id: string) {
    try {
      const response = await api.get<IEventTaskDTO[]>(`/list-event-tasks-by-user/${user_id}/${selectedEvent.id}`);
      handleSelectedUserEventTasks(response.data);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventNotes(eventId: string) {
    try {
      const response = await api.get<IEventNoteDTO[]>(`/event-notes/${eventId}`);
      handleEventNotes(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventTasks(eventId: string) {
    try {
      const response = await api.get<IEventTaskDTO[]>(`/event-tasks/${eventId}`);
      if (selectedEventTask && selectedEventTask.id) {
        const findTask = response.data.find(task => task.id === selectedEventTask.id);
        findTask && selectEventTask(findTask);
      }
      handleEventTasks(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventGuests(eventId: string) {
    try {
      const response = await api.get<IEventGuestDTO[]>(`/event-guests/list/${eventId}`);
      if (response.data && response.data.length > 0) {
        const sortedGuests = response.data.sort((a, b) => {
          if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) return 1;
          if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) return -1;
          if (a.last_name.toLowerCase() > b.last_name.toLowerCase()) return 1;
          if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) return -1;
          return 0;
        })
        handleEventGuests(sortedGuests);
        handleFilteredGuests(sortedGuests);
        setConfirmedGuests(response.data.filter((guest) => guest.confirmed).length);
        const guestsMine = response.data.filter((guest) => guest.host_id === user.id);
        setMyGuests(guestsMine);
        setMyNumberOfGuests(guestsMine.length);
        setMyGuestsConfirmed(guestsMine.filter((guest) => guest.confirmed === true).length);
        const oldSelectedGuest = response.data.find(
          (thisGuest) => thisGuest.id === selectedEventGuest.id,
        );
        oldSelectedGuest !== undefined && selectEventGuest(oldSelectedGuest);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventMembers(eventId: string) {
    try {
      const response = await api
        .get<IEventMemberDTO[]>(`event-members/${eventId}`);
      handleEventMembers(response.data);

      if (selectedEventMember && selectedEventMember.id) {
        const member = response.data.find(item => item.id === selectedEventMember.id);
        member && selectEventMember(member);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventMonthlyPaymentAgreements(eventId: string) {
    try {
      const response = await api
        .get<IEventMonthlyPaymentAgreementDTO[]>(`event-monthly-payment-agreements/${eventId}`);
        handleEventMonthlyPaymentAgreements(response.data);

      if (selectedEventMonthlyPaymentAgreement && selectedEventMonthlyPaymentAgreement.id) {
        const agreement = response.data.find(item => item.id === selectedEventMonthlyPaymentAgreement.id);
        agreement && selectEventMonthlyPaymentAgreement(agreement);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventOwners(eventId: string) {
    try {
      const response = await api
        .get<IEventOwnerDTO[]>(`/event-owners/${eventId}`);
      handleEventOwners(response.data);
      response.data.map((xOwner) => {
        xOwner.userEventOwner.id === user.id && setIsOwner(true);
        return xOwner;
      });

      if (selectedEventOwner && selectedEventOwner.id) {
        const owner = response.data.find(item => item.id === selectedEventOwner.id);
        if (owner) selectEventOwner(owner);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function handleSelectedEvent(data: IEventDTO) {
    if (!data || (data && !data.id)) return unsetEventVariables();
    // data.id !== selectedEvent.id && unsetEventVariables();
    try {
      Promise.all([
        getEventGuests(data.id),
        getEventOwners(data.id),
        getEventMembers(data.id),
        getEventSuppliers(data.id),
        getEventNotes(data.id),
        getEventTasks(data.id),
        getEventBudget(data.id),
        getEventTransactions(data.id),
        getEventMonthlyPaymentAgreements(data.id),
      ]);
      setCurrentSection('Notes');
      await selectEvent(data);
    } catch(err) {
      throw new Error(err);
    }

  }

  async function getEvent(eventId: string) {
    try {
      const response = await api.get<IEventDTO>(`/events/${eventId}`);
      selectEvent(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function createEventBudget(budget: number): Promise<void> {
    try {
      setLoading(true);
      await api.post('/event-budget', {
        event_id: selectedEvent.id,
        budget,
      });

      await getEvent(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateEventBudget({
    id,
    budget,
  }: IEventBudgetDTO): Promise<void> {
    try {
      setLoading(true);
      await api.put(`/event-budget/${id}`, {
        budget,
      });
      await getEventBudget(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteEvent(): Promise<void> {
    try {
      if (selectedEvent.user_id === user.id) {
        await api.delete(`/events/${selectedEvent.id}`);
        getEventsAsOwner();
      }
      const findOwner = eventOwners.find(
        owner => owner.userEventOwner.id === user.id,
      );
      if (findOwner) {
        await api.delete(`/event-owners/${findOwner.id}`);
        getEventsAsOwner();
      }
      const findMember = eventMembers.find(
        member => member.userEventMember.id === user.id,
      );
      if (findMember) {
        await api.delete(`/event-members/${findMember.id}`);
        getEventsAsMember();
      }
      const findGuest = eventGuests.find(
        guest => guest.weplanGuest.weplanUserGuest.id === user.id,
      );
      if (findGuest) {
        await api.delete(`/event-guests/${findGuest.id}`);
        getEventsAsGuest();
      }
      if (selectedEvent.id === nextEvent.id) {
        getNextEvent();
      }

      setDeleteEventConfirmationWindow(false);
      Alert.alert(
        'Evento Deletado com sucesso',
        'Você já pode visualizar as alterações no seu dashboard.',
      );
    } catch (err) {
      Alert.alert(
        'Não foi possível deletar seu evento',
        'Tente novamente.',
      );
      setDeleteEventConfirmationWindow(false);
      throw new Error(err);
    }
  }

  return (
    <MyEventContext.Provider
      value={{
        loading,
        dischargedSuppliers,
        eventFinancialSubSection,
        budgetWindow,
        backdropSearch,
        getEvent,
        createEventBudget,
        updateEventBudget,
        getEventSuppliers,
        getEventGuests,
        handleBackdropSearch,
        hiredSuppliers,
        notHiredSuppliers,
        getEventOwners,
        getEventMembers,
        myGuests,
        myGuestsConfirmed,
        numberOfGuests,
        confirmedGuests,
        myNumberOfGuests,
        availableNumberOfGuests,
        totalEventCost,
        isOwner,
        currentSection,
        handleEventFinancialSubSection,
        handleBudgetWindow,
        handleDeleteEventConfirmationWindow,
        deleteEventConfirmationWindow,
        handleSelectedEvent,
        calculateTotalEventCost,
        selectEventSection,
        unsetEventVariables,
        handleSectionDescriptionWindow,
        sectionDescriptionWindow,
        getEventNotes,
        getEventTasks,
        getEventBudget,
        getEventTransactions,
        getSelectedUserEventTasks,
        handleDeleteEvent,
        getEventMonthlyPaymentAgreements,
      }}
    >
      {children}
    </MyEventContext.Provider>
  );
};

function useMyEvent(): MyEventContextType {
  const context = useContext(MyEventContext);

  if (!context) throw new Error('useMyEvent must be used within an AuthProvider');
  return context;
}

export { MyEventProvider, useMyEvent };
