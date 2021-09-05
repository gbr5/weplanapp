import React, {
  useContext,
  createContext,
  useState,
  useCallback,
} from 'react';

import api from '../services/api';

import { useAuth } from './auth';

import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IEventInfoDTO from '../dtos/IEventInfoDTO';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IEventSupplierDTO from '../dtos/IEventSupplierDTO';
import IEventDTO from '../dtos/IEventDTO';
import IEventTaskDTO from '../dtos/IEventTaskDTO';
import IEventBudgetDTO from '../dtos/IEventBudgetDTO';
import IEventSupplierTransactionAgreementDTO from '../dtos/IEventSupplierTransactionAgreementDTO';
import IEventNoteDTO from '../dtos/IEventNoteDTO';
import IEventTransactionDTO from '../dtos/IEventTransactionDTO';

interface MyEventContextType {
  eventFinancialSubSection: string;
  budgetWindow: boolean;
  backdropSearch: boolean;
  loading: boolean;
  selectedEvent: IEventDTO;
  eventInfo: IEventInfoDTO;
  eventBudget: IEventBudgetDTO;
  selectedOwner: IEventOwnerDTO;
  owners: IEventOwnerDTO[];
  selectedMember: IEventMemberDTO;
  members: IEventMemberDTO[];
  eventTransactions: IEventTransactionDTO[];
  eventNotes: IEventNoteDTO[];
  eventTasks: IEventTaskDTO[];
  eventSuppliers: IEventSupplierDTO[];
  hiredSuppliers: IEventSupplierDTO[];
  dischargedSuppliers: IEventSupplierDTO[];
  notHiredSuppliers: IEventSupplierDTO[];
  supplierAgreements: IEventSupplierTransactionAgreementDTO[];
  selectedSupplier: IEventSupplierDTO;
  selectedTask: IEventTaskDTO;
  guests: IEventGuestDTO[];
  myGuests: IEventGuestDTO[];
  selectedGuest: IEventGuestDTO;
  numberOfGuests: number;
  myGuestsConfirmed: number;
  confirmedGuests: number;
  myNumberOfGuests: number;
  availableNumberOfGuests: number;
  totalEventCost: number;
  isOwner: boolean;
  currentSection: string;
  sectionDescriptionWindow: boolean;
  handleEventFinancialSubSection: (data: string) => void;
  handleBudgetWindow: () => void;
  handleSectionDescriptionWindow: () => void;
  handleBackdropSearch: () => void;
  selectEvent: (event: IEventDTO) => void;
  getEventGuests: (eventId: string) => Promise<void>;
  selectEventTask: (task: IEventTaskDTO) => void;
  selectSupplier: (supplier: IEventSupplierDTO) => void;
  selectOwner: (owner: IEventOwnerDTO) => void;
  selectMember: (member: IEventMemberDTO) => void;
  getEventOwners: (event_id: string) => Promise<void>;
  getEventMembers: (event_id: string) => Promise<void>;
  getEventSuppliers: (event_id: string) => Promise<void>;
  selectGuest: (guest: IEventGuestDTO) => void;
  calculateTotalEventCost: () => void;
  selectEventSection: (e: string) => void;
  getEvent: (eventId: string) => Promise<void>;
  getEventNotes: (eventId: string) => Promise<void>;
  getEventTasks: (eventId: string) => Promise<void>;
  getEventBudget: (eventId: string) => Promise<void>;
  getEventTransactions: (eventId: string) => Promise<void>;
  createEventBudget: (budget: number) => Promise<void>;
  updateEventBudget: (data: IEventBudgetDTO) => Promise<void>;
  unsetEventVariables: () => void;
}

const MyEventContext = createContext({} as MyEventContextType);

const MyEventProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [eventFinancialSubSection, setEventFinancialSubSection] = useState('Main');
  const [loading, setLoading] = useState(false);
  const [backdropSearch, setBackdropSearch] = useState(false);
  const [budgetWindow, setBudgetWindow] = useState(false);
  const [sectionDescriptionWindow, setSectionDescriptionWindow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({} as IEventDTO);
  const [eventInfo, setEventInfo] = useState({} as IEventInfoDTO);
  const [selectedOwner, setSelectedOwner] = useState({} as IEventOwnerDTO);
  const [selectedMember, setSelectedMember] = useState({} as IEventMemberDTO);
  const [owners, setOwners] = useState<IEventOwnerDTO[]>([]);
  const [members, setMembers] = useState<IEventMemberDTO[]>([]);
  const [eventNotes, setEventNotes] = useState<IEventNoteDTO[]>([]);
  const [eventTasks, setEventTasks] = useState<IEventTaskDTO[]>([]);
  const [eventSuppliers, setEventSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [hiredSuppliers, setHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [dischargedSuppliers, setDischargedSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [notHiredSuppliers, setNotHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [guests, setGuests] = useState<IEventGuestDTO[]>([]);
  const [myGuests, setMyGuests] = useState<IEventGuestDTO[]>([]);
  const [selectedGuest, setSelectedGuest] = useState({} as IEventGuestDTO);
  const [eventBudget, setEventBudget] = useState({} as IEventBudgetDTO);
  const [myGuestsConfirmed, setMyGuestsConfirmed] = useState(0);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [myNumberOfGuests, setMyNumberOfGuests] = useState(0);
  const [availableNumberOfGuests, setAvailableNumberOfGuests] = useState(0);
  const [totalEventCost, setTotalEventCost] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [currentSection, setCurrentSection] = useState('Notes');
  const [selectedTask, setSelectedTask] = useState({} as IEventTaskDTO);
  const [selectedSupplier, setSelectedSupplier] = useState({} as IEventSupplierDTO);
  const [supplierAgreements, setSupplierAgreements] = useState<IEventSupplierTransactionAgreementDTO[]>([]);
  const [eventTransactions, setEventTransactions] = useState<IEventTransactionDTO[]>([]);

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

  function unsetEventVariables() {
    setEventInfo({} as IEventInfoDTO);
    setOwners([]);
    setMembers([]);
    setGuests([]);
    setEventSuppliers([]);
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
    setSelectedTask({} as IEventTaskDTO);
    setSelectedSupplier({} as IEventSupplierDTO);
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

  function selectEventTask(task: IEventTaskDTO) {
    setSelectedTask(task);
  }
  async function getEventTransactions(eventId: string) {
    try {
      const transactions = await api.get<IEventTransactionDTO[]>(`/list-event-transactions/${eventId}`);

      setEventTransactions(transactions.data
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
      if (selectedSupplier && selectedSupplier.id) {
        const findSupplier = response.data.find(supplier => supplier.id === selectedSupplier.id);
        findSupplier && setSelectedSupplier(findSupplier);
      }
      setEventSuppliers(response.data);
      const agreements: IEventSupplierTransactionAgreementDTO[] = [];
      response.data.map(supplier => {
        supplier.transactionAgreements.map(agreement => !agreement.isCancelled && agreements.push(agreement));
        return supplier;
      });
      setSupplierAgreements(agreements);
      const newNotHired = response.data.filter((selected) => !selected.isHired && !selected.isDischarged);
      const newHired = response.data.filter((selected) => selected.isHired && !selected.isDischarged);
      const newDischarged = response.data.filter((selected) => selected.isDischarged);
      setNotHiredSuppliers(newNotHired);
      setHiredSuppliers(newHired);
      setDischargedSuppliers(newDischarged);
      if (selectedSupplier && selectedSupplier.id) {
        const updatedSupplier = response.data.find(supplier => supplier.id === selectedSupplier.id);
        updatedSupplier && setSelectedSupplier(updatedSupplier);
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
      setEventBudget(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventNotes(eventId: string) {
    try {
      const response = await api.get<IEventNoteDTO[]>(`/event-notes/${eventId}`);
      setEventNotes(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventTasks(eventId: string) {
    try {
      const response = await api.get<IEventTaskDTO[]>(`/event-tasks/${eventId}`);
      if (selectedTask && selectedTask.id) {
        const findTask = response.data.find(task => task.id === selectedTask.id);
        findTask && setSelectedTask(findTask);
      }
      setEventTasks(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventGuests(eventId: string) {
    try {
      const response = await api.get<IEventGuestDTO[]>(`/event-guests/list/${eventId}`);
      if (response.data && response.data.length > 0) {
        setGuests(response.data);
        setConfirmedGuests(response.data.filter((guest) => guest.confirmed).length);
        const guestsMine = response.data.filter((guest) => guest.host_id === user.id);
        setMyGuests(guestsMine);
        setMyNumberOfGuests(guestsMine.length);
        setMyGuestsConfirmed(guestsMine.filter((guest) => guest.confirmed === true).length);
        const oldSelectedGuest = response.data.find(
          (thisGuest) => thisGuest.id === selectedGuest.id,
        );
        oldSelectedGuest !== undefined && setSelectedGuest(oldSelectedGuest);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventMembers(eventId: string) {
    try {
      const response = await api
        .get<IEventMemberDTO[]>(`event-members/${eventId}`);
      setMembers(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventOwners(eventId: string) {
    try {
      const response = await api
        .get<IEventOwnerDTO[]>(`/event-owners/${eventId}`);
      setOwners(response.data);
      response.data.map((xOwner) => {
        xOwner.userEventOwner.id === user.id && setIsOwner(true);
        return xOwner;
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  function selectEvent(data: IEventDTO) {
    if (data.id !== selectedEvent.id) {
      unsetEventVariables();
    }
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
      ]);
      setCurrentSection('Notes');
      setSelectedEvent(data);
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

  function selectGuest(guest: IEventGuestDTO) {
    setSelectedGuest(guest);
  }

  function selectSupplier(supplier: IEventSupplierDTO) {
    setSelectedSupplier(supplier);
  }

  function selectOwner(owner: IEventOwnerDTO) {
    setSelectedOwner(owner);
  }

  function selectMember(member: IEventMemberDTO) {
    setSelectedMember(member);
  }

  return (
    <MyEventContext.Provider
      value={{
        loading,
        dischargedSuppliers,
        eventFinancialSubSection,
        eventBudget,
        budgetWindow,
        backdropSearch,
        getEvent,
        createEventBudget,
        updateEventBudget,
        getEventSuppliers,
        getEventGuests,
        selectedEvent,
        selectedGuest,
        eventInfo,
        owners,
        members,
        eventSuppliers,
        handleBackdropSearch,
        hiredSuppliers,
        notHiredSuppliers,
        getEventOwners,
        getEventMembers,
        guests,
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
        selectEvent,
        selectGuest,
        calculateTotalEventCost,
        selectedMember,
        selectedOwner,
        selectMember,
        selectOwner,
        selectEventSection,
        selectEventTask,
        selectedTask,
        selectSupplier,
        selectedSupplier,
        unsetEventVariables,
        supplierAgreements,
        handleSectionDescriptionWindow,
        sectionDescriptionWindow,
        eventNotes,
        getEventNotes,
        eventTasks,
        getEventTasks,
        getEventBudget,
        getEventTransactions,
        eventTransactions,
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
