import React, { createContext, useContext, useState } from 'react';
import ICreateEventOwnerDTO from '../dtos/ICreateEventOwnerDTO';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';
import IFriendDTO from '../dtos/IFriendDTO';
import api from '../services/api';
import { useEventVariables } from './eventVariables';
import { useMyEvent } from './myEvent';

interface EventOwnersContextType {
  addOwnerWindow: boolean;
  createEventOwnerTaskWindow: boolean;
  eventOwnerTaskWindow: boolean;
  eventOwnerTransactionAgreementsWindow: boolean;
  createEventOwnerTransactionAgreement: boolean;
  newOwnerTransactionAgreementConfirmation: boolean;
  eventOwnerAgreementTransactionsWindow: boolean;
  handleEventOwnerAgreementTransactionsWindow: () => void;
  handleCreateEventOwnerTransactionAgreement: () => void;
  handleNewOwnerTransactionAgreementConfirmation: () => void;
  handleAddOwnerWindow: () => void;
  handleCreateEventOwnerTaskWindow: () => void;
  handleEventOwnerTaskWindow: () => void;
  handleEventOwnerTransactionAgreementsWindow: () => void;
  addMultipleOwners: (data: IFriendDTO[]) => Promise<void>;
  editEventOwner: (data: IEventOwnerDTO) => Promise<void>;
  createEventOwner: (data: ICreateEventOwnerDTO) => Promise<void>;
  deleteEventOwner: (id: string) => Promise<void>;
}

const EventOwnersContext = createContext({} as EventOwnersContextType);

const EventOwnersProvider: React.FC = ({ children }) => {
  const { getEventOwners } = useMyEvent();
  const { selectedEvent } = useEventVariables();

  const [addOwnerWindow, setAddOwnerWindow] = useState(false);
  const [createEventOwnerTaskWindow, setCreateEventOwnerTaskWindow] = useState(false);
  const [eventOwnerTaskWindow, setEventOwnerTaskWindow] = useState(false);
  const [newOwnerTransactionAgreementConfirmation, setNewOwnerTransactionAgreementConfirmation] = useState(false);
  const [createEventOwnerTransactionAgreement, setCreateEventOwnerTransactionAgreement] = useState(false);
  const [eventOwnerAgreementTransactionsWindow, setEventOwnerAgreementTransactionsWindow] = useState(false);
  const [eventOwnerTransactionAgreementsWindow, setEventOwnerTransactionAgreementsWindow] = useState(false);

  function handleAddOwnerWindow() {
    setAddOwnerWindow(!addOwnerWindow);
  }
  function handleCreateEventOwnerTaskWindow() {
    setCreateEventOwnerTaskWindow(!createEventOwnerTaskWindow);
  }
    function handleEventOwnerTaskWindow() {
    setEventOwnerTaskWindow(!eventOwnerTaskWindow);
  }
  function handleNewOwnerTransactionAgreementConfirmation() {
    setNewOwnerTransactionAgreementConfirmation(!newOwnerTransactionAgreementConfirmation);
  }
  function handleEventOwnerAgreementTransactionsWindow() {
    setEventOwnerAgreementTransactionsWindow(!eventOwnerAgreementTransactionsWindow);
  }
  function handleCreateEventOwnerTransactionAgreement() {
    setCreateEventOwnerTransactionAgreement(!createEventOwnerTransactionAgreement);
  }
  function handleEventOwnerTransactionAgreementsWindow() {
    setEventOwnerTransactionAgreementsWindow(!eventOwnerTransactionAgreementsWindow);
  }

  async function addMultipleOwners(data: IFriendDTO[]) {
    try {
      const owners = data.map(owner => {
        return {
          owner_id: owner.friend.id
        };
      });
      await api.post(`/create-multiple-event-owners/`, {
        event_id: selectedEvent.id,
        owners,
      });
      await getEventOwners(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
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
        addMultipleOwners,
        addOwnerWindow,
        createEventOwnerTaskWindow,
        eventOwnerTaskWindow,
        handleAddOwnerWindow,
        createEventOwnerTransactionAgreement,
        handleCreateEventOwnerTransactionAgreement,
        eventOwnerTransactionAgreementsWindow,
        handleEventOwnerTransactionAgreementsWindow,
        handleNewOwnerTransactionAgreementConfirmation,
        eventOwnerAgreementTransactionsWindow,
        handleEventOwnerAgreementTransactionsWindow,
        newOwnerTransactionAgreementConfirmation,
        handleCreateEventOwnerTaskWindow,
        handleEventOwnerTaskWindow,
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
