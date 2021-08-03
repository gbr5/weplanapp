import React, { createContext, useContext, useState } from 'react';
import ICreateEventOwnerDTO from '../dtos/ICreateEventOwnerDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import api from '../services/api';
import { useMyEvent } from './myEvent';

interface EventOwnersContextType {
  ownerDescriptionWindow: boolean;
  editEventOwner: (data: IEventOwnerDTO) => Promise<void>;
  createEventOwner: (data: ICreateEventOwnerDTO) => Promise<void>;
  deleteEventOwner: (id: string) => Promise<void>;
  handleOwnerDescriptionWindow: () => void;
}

const EventOwnersContext = createContext({} as EventOwnersContextType);

const EventOwnersProvider: React.FC = ({ children }) => {
  const { selectedEvent, getEventOwners } = useMyEvent();
  const [ownerDescriptionWindow, setOwnerDescriptionWindow] = useState(false);

  function handleOwnerDescriptionWindow() {
    setOwnerDescriptionWindow(!ownerDescriptionWindow);
  }

  async function createEventOwner(data: ICreateEventOwnerDTO) {
    try {
      await api.post(`/event-owners/${selectedEvent.id}`, data);
      await getEventOwners(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async function editEventOwner(data: IEventOwnerDTO) {
    try {
      await api.put(`/event-owners/${data.id}`, {
        number_of_guests: data.number_of_guests,
        description: data.description,
      });
      await getEventOwners(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async function deleteEventOwner(id: string) {
    try {
      await api.delete(`/event-owners/${id}`);
      await getEventOwners(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <EventOwnersContext.Provider
      value={{
        editEventOwner,
        createEventOwner,
        deleteEventOwner,
        handleOwnerDescriptionWindow,
        ownerDescriptionWindow,
      }}
    >
      {children}
    </EventOwnersContext.Provider>
  );
}

function useEventOwners(): EventOwnersContextType {
  const context = useContext(EventOwnersContext);

  if (!context) throw new Error('useEventOwners must be used within an AuthProvider!')
  return context;
}

export { EventOwnersProvider, useEventOwners };
