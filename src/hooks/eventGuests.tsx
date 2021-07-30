import React, {
  useContext,
  createContext,
  useState,
} from 'react';

import api from '../services/api';

import IEventGuestDTO from '../dtos/IEventGuestDTO';
import IAddNewEventGuestDTO from '../dtos/IAddNewEventGuestDTO';
import { useMyEvent } from './myEvent';
import ICreateGuestContactDTO from '../dtos/ICreateGuestContactDTO';
import IGuestContactDTO from '../dtos/IGuestContactDTO';

interface EventGuestsContextType {
  loading: boolean;
  selectedGuestContact: IGuestContactDTO;
  editGuestConfirmation: (data: IEventGuestDTO) => Promise<void>;
  addNewGuest: (data: IAddNewEventGuestDTO) => Promise<void>;
  editGuest: (data: IEventGuestDTO) => Promise<void>;
  createGuestContact: (data: ICreateGuestContactDTO) => Promise<void>;
  updateGuestContact: (data: IGuestContactDTO) => Promise<void>;
  deleteGuestContact: (data: IGuestContactDTO) => Promise<void>;
  selectGuestContact: (data: IGuestContactDTO) => void;
  unsetEventGuestVariables: () => void;
}

const EventGuestsContext = createContext({} as EventGuestsContextType);

const EventGuestsProvider: React.FC = ({ children }) => {
  const { selectedEvent, getEventGuests, selectGuest } = useMyEvent();

  const [loading, setLoading] = useState(false);
  const [selectedGuestContact, setSelectedGuestContact] = useState({} as IGuestContactDTO);

  function unsetEventGuestVariables() {
    setSelectedGuestContact({} as IGuestContactDTO);
  }
  async function addNewGuest({ first_name, last_name }: IAddNewEventGuestDTO) {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  async function editGuestConfirmation(data: IEventGuestDTO) {
    try {
      selectGuest(data);
      setLoading(true);
      await api.put(`events/${data.event_id}/guests/${data.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
        confirmed: !data.confirmed,
      });
      await getEventGuests(data.event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
      selectGuest({} as IEventGuestDTO);
    }
  }

  async function editGuest(data: IEventGuestDTO) {
    try {
      setLoading(true);
      await api.put(`events/${data.event_id}/guests/${data.id}`, {
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
        confirmed: data.confirmed,
      });
      await getEventGuests(data.event_id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createGuestContact(data: ICreateGuestContactDTO) {
    try {
      setLoading(true);
      await api.post('/guest-contacts', data);
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateGuestContact(data: IGuestContactDTO) {
    try {
      setLoading(true);
      await api.put(`/guest-contacts/${data.id}`, data);
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteGuestContact(data: IGuestContactDTO) {
    try {
      setLoading(true);
      await api.delete(`/guest-contacts/${data.id}`);
      await getEventGuests(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  function selectGuestContact(data: IGuestContactDTO) {
    setSelectedGuestContact(data);
  }

  return (
    <EventGuestsContext.Provider
      value={{
        addNewGuest,
        createGuestContact,
        deleteGuestContact,
        editGuest,
        editGuestConfirmation,
        loading,
        selectGuestContact,
        selectedGuestContact,
        updateGuestContact,
        unsetEventGuestVariables
      }}
    >
      {children}
    </EventGuestsContext.Provider>
  );
};

function useEventGuests(): EventGuestsContextType {
  const context = useContext(EventGuestsContext);

  if (!context) throw new Error('useEventGuests must be used within an AuthProvider');
  return context;
}

export { EventGuestsProvider, useEventGuests };
