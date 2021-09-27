import React, {
  useContext,
  createContext,
  useState,
} from 'react';

import api from '../services/api';

import IEventInfoDTO from '../dtos/IEventInfoDTO';
import ICreateEventInfoDTO from '../dtos/ICreateEventInfoDTO';
import { useEventVariables } from './eventVariables';

interface EventInfoContextType {
  loading: boolean;
  editEventInfo: (data: IEventInfoDTO) => Promise<void>;
  createEventInfo: (data: ICreateEventInfoDTO) => Promise<void>;
}

const EventInfoContext = createContext({} as EventInfoContextType);

const EventInfoProvider: React.FC = ({ children }) => {
  const { selectedEvent } = useEventVariables();
  const [loading, setLoading] = useState(false);

  async function editEventInfo(data: IEventInfoDTO) {
    try {
      setLoading(true);
      await api.put(`/events/${data.event_id}/event-info`, data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createEventInfo(data: ICreateEventInfoDTO) {
    try {
      setLoading(true);
      await api.post(`/event-info/${selectedEvent.id}`, data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <EventInfoContext.Provider
      value={{
        loading,
        createEventInfo,
        editEventInfo,
      }}
    >
      {children}
    </EventInfoContext.Provider>
  );
};

function useEventInfo(): EventInfoContextType {
  const context = useContext(EventInfoContext);

  if (!context) throw new Error('useEventInfo must be used within an AuthProvider');
  return context;
}

export { EventInfoProvider, useEventInfo };
