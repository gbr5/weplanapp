import React, { createContext, useContext, useState } from 'react';
import ICreateEventMemberDTO from '../dtos/ICreateEventMember';
import IEventMemberDTO from '../dtos/IEventMemberDTO';
import IFriendDTO from '../dtos/IFriendDTO';
import api from '../services/api';
import { useMyEvent } from './myEvent';

interface EventMembersContextType {
  addMemberWindow: boolean;
  handleAddMemberWindow: () => void;
  addMultipleMembers: (data: IFriendDTO[]) => Promise<void>;
  editEventMember: (data: IEventMemberDTO) => void;
  createEventMember: (data: ICreateEventMemberDTO) => void;
  deleteEventMember: (id: string) => void;
}

const EventMembersContext = createContext({} as EventMembersContextType);

const EventMembersProvider: React.FC = ({ children }) => {
  const { getEventMembers, selectedEvent } = useMyEvent();

  const [addMemberWindow, setAddMemberWindow] = useState(false);

  function handleAddMemberWindow() {
    setAddMemberWindow(!addMemberWindow);
  }

  async function addMultipleMembers(data: IFriendDTO[]) {
    try {
      Promise.all([
        data.map(({ friend }) => {
          return api.post(`/event-members/${selectedEvent.id}`, {
            member_id: friend.id,
            number_of_guests: 0,
          });
        }),
      ]);
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
      await api.put(`/event-members/${data.id}`, {
        number_of_guests: data.number_of_guests,
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
        createEventMember,
        deleteEventMember,
        addMemberWindow,
        addMultipleMembers,
        handleAddMemberWindow,
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
