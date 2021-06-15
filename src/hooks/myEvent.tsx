import React, {
  useCallback,
  useContext,
  createContext,
  useState,
} from 'react';

import api from '../services/api';

import { useAuth } from './auth';
import { useEvent } from './event';

import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IEventInfoDTO from '../dtos/IEventInfoDTO';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IEventSupplierDTO from '../dtos/IEventSupplierDTO';
import IEventDTO from '../dtos/IEventDTO';

interface MyEventContextType {
  selectedEvent: IEventDTO;
  eventInfo: IEventInfoDTO;
  owners: IEventOwnerDTO[];
  members: IEventMemberDTO[];
  hiredSuppliers: IEventSupplierDTO[];
  notHiredSuppliers: IEventSupplierDTO[];
  guests: IEventGuestDTO[];
  myGuests: IEventGuestDTO[];
  numberOfGuests: number;
  myGuestsConfirmed: number;
  confirmedGuests: number;
  myNumberOfGuests: number;
  availableNumberOfGuests: number;
  totalEventCost: number;
  isOwner: boolean;
  currentSection: string;
  selectEvent: (event: IEventDTO) => void;
  calculateTotalEventCost: () => void;
  getEventInfo: () => Promise<void>;
  getEventOwners: () => Promise<void>;
  getEventMembers: () => Promise<void>;
  getEventGuests: () => Promise<void>;
  getSuppliers: () => Promise<void>;
  selectEventSection: (e: string) => void;
}

const MyEventContext = createContext({} as MyEventContextType);

// eslint-disable-next-line react/prop-types
const MyEventProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState({} as IEventDTO);
  const [eventInfo, setEventInfo] = useState({} as IEventInfoDTO);
  const [owners, setOwners] = useState<IEventOwnerDTO[]>([]);
  const [members, setMembers] = useState<IEventMemberDTO[]>([]);
  const [hiredSuppliers, setHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [notHiredSuppliers, setNotHiredSuppliers] = useState<IEventSupplierDTO[]>([]);
  const [guests, setGuests] = useState<IEventGuestDTO[]>([]);
  const [myGuests, setMyGuests] = useState<IEventGuestDTO[]>([]);
  const [myGuestsConfirmed, setMyGuestsConfirmed] = useState(0);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [myNumberOfGuests, setMyNumberOfGuests] = useState(0);
  const [availableNumberOfGuests, setAvailableNumberOfGuests] = useState(0);
  const [totalEventCost, setTotalEventCost] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [currentSection, setCurrentSection] = useState('Dashboard');

  // useEffect(() => {
  //   async function loadStorageData() {
  //     const data = await AsyncStorage.multiGet([
  //       `@WePlan-Party:${selectedEvent.name}eventInfo`,
  //       `@WePlan-Party:${selectedEvent.name}owners`,
  //       `@WePlan-Party:${selectedEvent.name}members`,
  //       `@WePlan-Party:${selectedEvent.name}guests`,
  //     ]);
  //   }
  // }, [selectedEvent]);

  const selectEventSection = useCallback((e: string) => {
    setCurrentSection(e);
  }, []);
  const getEventGuests = useCallback(async () => {
    try {
      const response = await api.get<IEventGuestDTO[]>(`/events/${selectedEvent.id}/guests`);
      if (response.data && response.data.length > 0) {
        setGuests(response.data);
        setConfirmedGuests(response.data.filter((guest) => guest.confirmed).length);
        const guestsMine = response.data.filter((guest) => guest.host_id === user.id);
        setMyGuests(guestsMine);
        setMyNumberOfGuests(guestsMine.length);
        setMyGuestsConfirmed(guestsMine.filter((guest) => guest.confirmed === true).length);
      }
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedEvent, user]);

  const getEventInfo = useCallback(async () => {
    try {
      const response = await api.get<IEventInfoDTO>(`/events/${selectedEvent.id}/event-info`);
      setEventInfo(response.data);
      setNumberOfGuests(response.data.number_of_guests);
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedEvent]);

  const getEventMembers = useCallback(async () => {
    try {
      const response = await api
        .get<IEventMemberDTO[]>(`events/${selectedEvent.id}/event-members`);
      setMembers(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedEvent]);

  const getEventOwners = useCallback(async () => {
    try {
      const response = await api
        .get<IEventOwnerDTO[]>(`events/${selectedEvent.id}/event-owners`);
      response.data.map((xOwner) => {
        xOwner.userEventOwner.id === user.id && setIsOwner(true);
        return xOwner;
      });
      setOwners(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedEvent, user]);

  const calculateTotalEventCost = useCallback(() => {
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
  }, [hiredSuppliers]);

  const getSuppliers = useCallback(async () => {
    try {
      const response = await api
        .get<IEventSupplierDTO[]>(`events/event-suppliers/${selectedEvent.id}`);
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
  }, [selectedEvent, calculateTotalEventCost]);

  const selectEvent = useCallback((data: IEventDTO) => {
    setCurrentSection('Dashboard');
    setSelectedEvent(data);
    getSuppliers();
    getEventGuests();
    getEventInfo();
    getEventMembers();
    getEventOwners();
  }, [
    getSuppliers,
    getEventGuests,
    getEventInfo,
    getEventMembers,
    getEventOwners,
  ]);

  return (
    <MyEventContext.Provider
      value={{
        selectedEvent,
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
        calculateTotalEventCost,
        getEventGuests,
        getEventInfo,
        getEventMembers,
        getEventOwners,
        getSuppliers,
        selectEventSection,
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
