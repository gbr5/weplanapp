import React, {
  useContext,
  createContext,
  useState,
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

interface MyEventContextType {
  selectedEvent: IEventDTO;
  eventInfo: IEventInfoDTO;
  owners: IEventOwnerDTO[];
  members: IEventMemberDTO[];
  hiredSuppliers: IEventSupplierDTO[];
  notHiredSuppliers: IEventSupplierDTO[];
  eventTasks: IEventTaskDTO[];
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
  selectEvent: (event: IEventDTO) => void;
  getEventGuests: (eventId: string) => Promise<void>;
  selectEventTask: (task: IEventTaskDTO) => void;
  getEventTasks: (eventId: string) => Promise<IEventTaskDTO[]>;
  selectGuest: (guest: IEventGuestDTO) => void;
  calculateTotalEventCost: () => void;
  selectEventSection: (e: string) => void;
  getEvent: (eventId: string) => Promise<void>;
}

const MyEventContext = createContext({} as MyEventContextType);

const MyEventProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState({} as IEventDTO);
  const [eventInfo, setEventInfo] = useState({} as IEventInfoDTO);
  const [owners, setOwners] = useState<IEventOwnerDTO[]>([]);
  const [members, setMembers] = useState<IEventMemberDTO[]>([]);
  const [hiredSuppliers, setHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [notHiredSuppliers, setNotHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [eventTasks, setEventTasks] = useState<IEventTaskDTO[]>([]);
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

  function unsetEventVariables() {
    setEventInfo({} as IEventInfoDTO);
    setOwners([]);
    setMembers([]);
    setGuests([]);
    setHiredSuppliers([]);
    setNotHiredSuppliers([]);
    setMyGuests([]);
    setNumberOfGuests(0);
    setMyNumberOfGuests(0);
    setMyGuestsConfirmed(0);
    setConfirmedGuests(0);
    setIsOwner(false);
    setTotalEventCost(0);
    setAvailableNumberOfGuests(0);
    setEventTasks([]);
    setSelectedTask({} as IEventTaskDTO);
  }
  function selectEventSection(e: string) {
    setCurrentSection(e);
  }

  function selectEventTask(task: IEventTaskDTO) {
    setSelectedTask(task);
  }

  async function getEventTasks(eventId: string) {
    try {
      const response = await api.get<IEventTaskDTO[]>(`/event-tasks/${eventId}`);
      if (response.data && response.data.length > 0) {
        setEventTasks(response.data);
        if (selectedTask && selectedTask.id) {
          const findSelectedTask = response.data.find(
            task => task.id === selectedTask.id,
          );
          findSelectedTask && setSelectedTask(findSelectedTask);
        }
      }
      return response.data;
    } catch (err) {
      throw new Error(err);
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
        .get<IEventMemberDTO[]>(`events/${eventId}/event-members`);
      setMembers(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function getEventOwners(eventId: string) {
    try {
      const response = await api
        .get<IEventOwnerDTO[]>(`events/${eventId}/event-owners`);
      response.data.map((xOwner) => {
        xOwner.userEventOwner.id === user.id && setIsOwner(true);
        return xOwner;
      });
      setOwners(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  function calculateTotalEventCost() {
    const totalCost: number = hiredSuppliers
      .map((supplier) => {
        let cost = 0;
        if (supplier.transactionAgreements) {
          cost = supplier.transactionAgreements
            .map((agreement) => Number(agreement.amount))
            .reduce((a, b) => a + b, 0);
        }
        return cost;
      })
      .reduce((a, b) => a + b, 0);
    setTotalEventCost(totalCost);
  }

  async function getSuppliers(eventId: string) {
    try {
      const response = await api
        .get<IEventSupplierDTO[]>(`events/event-suppliers/${eventId}`);
      setNotHiredSuppliers(
        response.data.filter((selected) => !selected.isHired),
      );
      setHiredSuppliers(
        response.data.filter((selected) => selected.isHired),
      );
      calculateTotalEventCost();
    } catch (err) {
      throw new Error(err);
    }
  }

  function selectEvent(data: IEventDTO) {
    if (data.id !== selectedEvent.id) {
      unsetEventVariables();
      getEventInfo(data.id);
      getEventTasks(data.id);
      getEventGuests(data.id);
      getEventOwners(data.id);
      getEventMembers(data.id);
      getSuppliers(data.id);
    }
    setCurrentSection('Dashboard');
    setSelectedEvent(data);
  }

  async function getEvent(eventId: string) {
    try {
      const response = await api.get(`/events/${eventId}`);
      selectEvent(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }

  function selectGuest(guest: IEventGuestDTO) {
    setSelectedGuest(guest);
  }

  return (
    <MyEventContext.Provider
      value={{
        getEvent,
        getEventTasks,
        eventTasks,
        getEventGuests,
        selectedEvent,
        selectedGuest,
        eventInfo,
        owners,
        members,
        hiredSuppliers,
        notHiredSuppliers,
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
        selectEvent,
        selectGuest,
        calculateTotalEventCost,
        selectEventSection,
        selectEventTask,
        selectedTask,
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
