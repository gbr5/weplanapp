import React, { createContext, useContext, useState } from 'react';

import ICreateEventMemberDTO from '../dtos/ICreateEventMember';
import IEventMemberDTO from '../dtos/IEventMemberDTO';

import IFriendDTO from '../dtos/IFriendDTO';
import api from '../services/api';
import { useEventVariables } from './eventVariables';
import { useMyEvent } from './myEvent';

interface EventMembersContextType {
  addMemberWindow: boolean;
  createEventMemberTaskWindow: boolean;
  eventMemberTaskWindow: boolean;
  eventMemberTransactionAgreementsWindow: boolean;
  createEventMemberTransactionAgreement: boolean;
  newMemberTransactionAgreementConfirmation: boolean;
  eventMemberAgreementTransactionsWindow: boolean;
  handleEventMemberAgreementTransactionsWindow: () => void;
  handleCreateEventMemberTransactionAgreement: () => void;
  handleNewMemberTransactionAgreementConfirmation: () => void;
  handleEventMemberTransactionAgreementsWindow: () => void;
  handleAddMemberWindow: () => void;
  handleCreateEventMemberTaskWindow: () => void;
  handleEventMemberTaskWindow: () => void;
  addMultipleMembers: (data: IFriendDTO[]) => Promise<void>;
  editEventMember: (data: IEventMemberDTO) => Promise<void>;
  editEventMembersNumberOfGuests: (number_of_guests: number) => Promise<void>;
  createEventMember: (data: ICreateEventMemberDTO) => void;
  deleteEventMember: (id: string) => Promise<void>;
}

const EventMembersContext = createContext({} as EventMembersContextType);

const EventMembersProvider: React.FC = ({ children }) => {
  const { getEventMembers } = useMyEvent();
  const { selectedEvent } = useEventVariables();

  const [addMemberWindow, setAddMemberWindow] = useState(false);
  const [createEventMemberTaskWindow, setCreateEventMemberTaskWindow] = useState(false);
  const [eventMemberTaskWindow, setEventMemberTaskWindow] = useState(false);
  const [eventMemberTransactionAgreementsWindow, setEventMemberTransactionAgreementsWindow] = useState(false);
  const [newMemberTransactionAgreementConfirmation, setNewMemberTransactionAgreementConfirmation] = useState(false);
  const [createEventMemberTransactionAgreement, setCreateEventMemberTransactionAgreement] = useState(false);
  const [eventMemberAgreementTransactionsWindow, setEventMemberAgreementTransactionsWindow] = useState(false);

  function handleAddMemberWindow() {
    setAddMemberWindow(!addMemberWindow);
  }
  function handleCreateEventMemberTaskWindow() {
    setCreateEventMemberTaskWindow(!createEventMemberTaskWindow);
  }
  function handleEventMemberTaskWindow() {
    setEventMemberTaskWindow(!eventMemberTaskWindow);
  }

  function handleEventMemberTransactionAgreementsWindow() {
    setEventMemberTransactionAgreementsWindow(!eventMemberTransactionAgreementsWindow);
  }
  function handleNewMemberTransactionAgreementConfirmation() {
    setNewMemberTransactionAgreementConfirmation(!newMemberTransactionAgreementConfirmation);
  }
  function handleEventMemberAgreementTransactionsWindow() {
    setEventMemberAgreementTransactionsWindow(!eventMemberAgreementTransactionsWindow);
  }
  function handleCreateEventMemberTransactionAgreement() {
    setCreateEventMemberTransactionAgreement(!createEventMemberTransactionAgreement);
  }
  async function addMultipleMembers(data: IFriendDTO[]) {
    try {
      const members = data.map(member => {
        return {
          member_id: member.friend.id,
        };
      });
      await api.post(`/create-multiple-event-members/`, {
        event_id: selectedEvent.id,
        members,
      });
      await getEventMembers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function createEventMember(data: ICreateEventMemberDTO) {
    try {
      await api.post(`/event-members/${selectedEvent.id}`, data);
      await getEventMembers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async function editEventMember(data: IEventMemberDTO) {
    try {
      await api.put(`/member/number-of-guests/${data.id}`, {
        number_of_guests: data.number_of_guests,
      });
      await getEventMembers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async function editEventMembersNumberOfGuests(number_of_guests: number) {
    try {
      await api.put(`/members/number-of-guests/${selectedEvent.id}`, {
        number_of_guests,
      });
      await getEventMembers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }
  async function deleteEventMember(id: string) {
    try {
      await api.delete(`/event-members/${id}`);
      await getEventMembers(selectedEvent.id);
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <EventMembersContext.Provider
      value={{
        editEventMember,
        editEventMembersNumberOfGuests,
        createEventMember,
        deleteEventMember,
        addMemberWindow,
        createEventMemberTaskWindow,
        addMultipleMembers,
        handleAddMemberWindow,
        handleCreateEventMemberTaskWindow,
        eventMemberTransactionAgreementsWindow,
        handleEventMemberTransactionAgreementsWindow,
        createEventMemberTransactionAgreement,
        eventMemberAgreementTransactionsWindow,
        handleCreateEventMemberTransactionAgreement,
        handleEventMemberAgreementTransactionsWindow,
        handleNewMemberTransactionAgreementConfirmation,
        newMemberTransactionAgreementConfirmation,
        eventMemberTaskWindow,
        handleEventMemberTaskWindow,
      }}
    >
      {children}
    </EventMembersContext.Provider>
  );
}

function useEventMembers(): EventMembersContextType {
  const context = useContext(EventMembersContext);

  if (!context) throw new Error('useEventMembers must be used within an AuthProvider!')
  return context;
}

export { EventMembersProvider, useEventMembers };
