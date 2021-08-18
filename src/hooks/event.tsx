/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import IEventDTO from '../dtos/IEventDTO';
import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IShowEventDTO from '../dtos/IShowEventDTO';
import ICreateEventDTO from '../dtos/ICreateEventDTO';
import api from '../services/api';
import ICeateEventDTO from '../dtos/ICreateEventDTO';

interface IEventContextData {
  loading: boolean;
  nextEvent: IShowEventDTO;
  eventsAsOwner: IEventOwnerDTO[];
  eventsAsMember: IEventMemberDTO[];
  eventsAsGuest: IEventGuestDTO[];
  getEventsAsOwner(): void;
  getEventsAsMember(): void;
  getEventsAsGuest(): void;
  getNextEvent(): void;
  createEvent(data: ICeateEventDTO): Promise<IEventDTO>;
}

const EventContext = createContext({} as IEventContextData);

// eslint-disable-next-line react/prop-types
const EventProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [nextEvent, setNextEvent] = useState({} as IShowEventDTO);
  const [eventsAsOwner, setEventsAsOwner] = useState<IEventOwnerDTO[]>([]);
  const [eventsAsMember, setEventsAsMember] = useState<IEventMemberDTO[]>([]);
  const [eventsAsGuest, setEventsAsGuest] = useState<IEventGuestDTO[]>([]);
  async function loadStorageData() {
    const events_as_owner = await AsyncStorage.getItem('@WP-App:events-as-owner');
    const events_as_member = await AsyncStorage.getItem('@WP-App:events-as-member');
    const events_as_guest = await AsyncStorage.getItem('@WP-App:events-as-guest');

    if (events_as_owner && events_as_member && events_as_guest) {
      setEventsAsOwner(JSON.parse(events_as_owner));
      setEventsAsMember(JSON.parse(events_as_member));
      setEventsAsGuest(JSON.parse(events_as_guest));
    }
    setLoading(false);
  }
  useEffect(() => {
    loadStorageData();
  }, []);
  const getEventsAsOwner = useCallback(async () => {
    try {
      const response = await api.get<IEventOwnerDTO[]>(
        '/list/events/user-as-owner/',
      );
      await AsyncStorage.setItem(
        '@WP-App:events-as-owner',
        JSON.stringify(response.data),
      );
      return setEventsAsOwner(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getEventsAsMember = useCallback(async () => {
    try {
      const response = await api.get<IEventMemberDTO[]>(
        '/list/events/user-as-member/',
      );
      await AsyncStorage.setItem(
        '@WP-App:events-as-member',
        JSON.stringify(response.data),
      );
      setEventsAsMember(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getEventsAsGuest = useCallback(async () => {
    try {
      const response = await api.get<IEventGuestDTO[]>(
        '/event/weplan-guests/list/user',
      );
      await AsyncStorage.setItem(
        '@WP-App:events-as-guest',
        JSON.stringify(response.data),
      );
      setEventsAsGuest(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getNextEvent = useCallback(async () => {
    try {
      const response = await api.get<IShowEventDTO>('/my-next-event/');
      setNextEvent(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const createEvent = useCallback(async ({
    name, date, event_type, isDateDefined,
  }: ICreateEventDTO) => {
    try {
      const event = await api.post('/events', {
        name,
        date,
        event_type,
        isDateDefined,
      });
      event && event.data && getNextEvent();
      event && event.data && getEventsAsOwner();
      return event.data;
    } catch (err) {
      throw new Error(err);
    }
  }, [getEventsAsOwner, getNextEvent]);

  return (
    <EventContext.Provider
      value={{
        loading,
        nextEvent,
        createEvent,
        eventsAsOwner,
        eventsAsGuest,
        eventsAsMember,
        getEventsAsOwner,
        getEventsAsMember,
        getEventsAsGuest,
        getNextEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

function useEvent(): IEventContextData {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEvent must bu used within an AuthProvider');
  }

  return context;
}

export { EventProvider, useEvent };
