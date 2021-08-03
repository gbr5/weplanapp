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
import { useMemo } from 'react';
import { formatBrlCurrency } from '../utils/formatBrlCurrency';
import IFriendDTO from '../dtos/IFriendDTO';

interface MyEventContextType {
  eventFinancialSubSection: string;
  budgetWindow: boolean;
  backdropSearch: boolean;
  loading: boolean;
  selectedEvent: IEventDTO;
  eventInfo: IEventInfoDTO;
  eventBudget: string;
  selectedOwner: IEventOwnerDTO;
  owners: IEventOwnerDTO[];
  selectedMember: IEventMemberDTO;
  members: IEventMemberDTO[];
  eventSuppliers: IEventSupplierDTO[];
  hiredSuppliers: IEventSupplierDTO[];
  dischargedSuppliers: IEventSupplierDTO[];
  notHiredSuppliers: IEventSupplierDTO[];
  selectedFriend: IFriendDTO;
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
  handleEventFinancialSubSection: (data: string) => void;
  handleBudgetWindow: () => void;
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
  getEventInfo: (event_id: string) => Promise<void>;
  selectGuest: (guest: IEventGuestDTO) => void;
  calculateTotalEventCost: () => void;
  selectEventSection: (e: string) => void;
  getEvent: (eventId: string) => Promise<void>;
  handleSelectedFriend: (data: IFriendDTO) => void;
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
  const [selectedEvent, setSelectedEvent] = useState({} as IEventDTO);
  const [eventInfo, setEventInfo] = useState({} as IEventInfoDTO);
  const [selectedOwner, setSelectedOwner] = useState({} as IEventOwnerDTO);
  const [selectedMember, setSelectedMember] = useState({} as IEventMemberDTO);
  const [owners, setOwners] = useState<IEventOwnerDTO[]>([]);
  const [members, setMembers] = useState<IEventMemberDTO[]>([]);
  const [eventSuppliers, setEventSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [hiredSuppliers, setHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [dischargedSuppliers, setDischargedSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [notHiredSuppliers, setNotHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [guests, setGuests] = useState<IEventGuestDTO[]>([]);
  const [myGuests, setMyGuests] = useState<IEventGuestDTO[]>([]);
  const [selectedGuest, setSelectedGuest] = useState({} as IEventGuestDTO);
  const [myGuestsConfirmed, setMyGuestsConfirmed] = useState(0);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [myNumberOfGuests, setMyNumberOfGuests] = useState(0);
  const [availableNumberOfGuests, setAvailableNumberOfGuests] = useState(0);
  const [totalEventCost, setTotalEventCost] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [currentSection, setCurrentSection] = useState('Tasks');
  const [selectedTask, setSelectedTask] = useState({} as IEventTaskDTO);
  const [selectedSupplier, setSelectedSupplier] = useState({} as IEventSupplierDTO);
  const [selectedFriend, setSelectedFriend] = useState({} as IFriendDTO);

  const eventBudget = useMemo(() => {
    if (selectedEvent && selectedEvent.id && selectedEvent.eventBudget)
      return formatBrlCurrency(selectedEvent.eventBudget.budget);
    return formatBrlCurrency(0);
  }, [selectedEvent]);

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

  function handleSelectedFriend(data: IFriendDTO) {
    setSelectedFriend(data);
  }

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

  function handleBackdropSearch() {
    setBackdropSearch(!backdropSearch);
  }

  function selectEventSection(e: string) {
    setCurrentSection(e);
  }

  function selectEventTask(task: IEventTaskDTO) {
    setSelectedTask(task);
  }

  async function getEventSuppliers(event_id: string) {
    try {
      const response = await api.get<IEventSupplierDTO[]>(`/event-suppliers/${event_id}`);
      if (selectedSupplier && selectedSupplier.id) {
        const findSupplier = response.data.find(supplier => supplier.id === selectedSupplier.id);
        findSupplier && setSelectedSupplier(findSupplier);
      }
      setEventSuppliers(response.data);
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

  async function getEventGuests(eventId: string) {
    try {
      const response = await api.get<IEventGuestDTO[]>(`/events/${eventId}/guests`);
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

  async function getEventInfo(eventId: string) {
    try {
      const response = await api.get<IEventInfoDTO>(`/events/${eventId}/event-info`);
      setEventInfo(response.data);
      setNumberOfGuests(response.data.number_of_guests);
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
        .get<IEventOwnerDTO[]>(`event-owners/${eventId}`);
      response.data.map((xOwner) => {
        xOwner.userEventOwner.id === user.id && setIsOwner(true);
        return xOwner;
      });
      setOwners(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  function selectEvent(data: IEventDTO) {
    if (data.id !== selectedEvent.id) {
      unsetEventVariables();
    }
    Promise.all([
      getEventInfo(data.id),
      getEventGuests(data.id),
      getEventOwners(data.id),
      getEventMembers(data.id),
      getEventSuppliers(data.id),
    ]);
    setCurrentSection('Tasks');
    setSelectedEvent(data);
  }

  async function getEvent(eventId: string) {
    try {
      const response = await api.get<IEventDTO>(`/events/${eventId}`);
      selectEvent(response.data);
      if (selectedTask && selectedTask.id) {
        const findTask = response.data.eventTasks.find(task => task.id === selectedTask.id);
        findTask && setSelectedTask(findTask);
      }
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
      await getEvent(selectedEvent.id);
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
        handleSelectedFriend,
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
        getEventInfo,
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
        selectedFriend,
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
