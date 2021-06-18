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
import IAddNewEventGuestDTO from '../dtos/IAddNewEventGuestDTO';

interface MyEventContextType {
  selectedEvent: IEventDTO;
  eventInfo: IEventInfoDTO;
  owners: IEventOwnerDTO[];
  members: IEventMemberDTO[];
  hiredSuppliers: IEventSupplierDTO[];
  notHiredSuppliers: IEventSupplierDTO[];
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
  selectGuest: (guest: IEventGuestDTO) => void;
  editGuestConfirmation: (data: IEventGuestDTO) => Promise<void>;
  calculateTotalEventCost: () => void;
  selectEventSection: (e: string) => void;
  addNewGuest: (data: IAddNewEventGuestDTO) => Promise<void>;
  editGuest: (data: IEventGuestDTO) => Promise<void>;
}

const MyEventContext = createContext({} as MyEventContextType);

const MyEventProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({} as IEventDTO);
  const [eventInfo, setEventInfo] = useState({} as IEventInfoDTO);
  const [owners, setOwners] = useState<IEventOwnerDTO[]>([]);
  const [members, setMembers] = useState<IEventMemberDTO[]>([]);
  const [hiredSuppliers, setHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
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
  const [currentSection, setCurrentSection] = useState('Dashboard');

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
  }
  function selectEventSection(e: string) {
    setCurrentSection(e);
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
      getEventGuests(data.id);
      getEventOwners(data.id);
      getEventMembers(data.id);
      getSuppliers(data.id);
    }
    setCurrentSection('Dashboard');
    setSelectedEvent(data);
  }

  function selectGuest(guest: IEventGuestDTO) {
    setSelectedGuest(guest);
  }

  async function addNewGuest({ first_name, last_name }: IAddNewEventGuestDTO) {
    try {
      await api.post(`events/${selectedEvent.id}/guests`, {
        first_name,
        last_name,
        description: ' ',
        weplanUser: false,
        confirmed: false,
        user_id: '0',
      });
      getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function editGuestConfirmation(data: IEventGuestDTO) {
    try {
      await api.put(`events/${data.event_id}/guests/${data.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
        confirmed: !data.confirmed,
      });
      getEventGuests(data.event_id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function editGuest(data: IEventGuestDTO) {
    try {
      await api.put(`events/${data.event_id}/guests/${data.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
        confirmed: data.confirmed,
      });
      getEventGuests(data.event_id);
      setLoading(true);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MyEventContext.Provider
      value={{
        editGuest,
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
        addNewGuest,
        editGuestConfirmation,
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
