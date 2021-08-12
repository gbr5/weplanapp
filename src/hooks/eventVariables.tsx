import React, { createContext, useContext } from 'react';
import { useEventGuests } from './eventGuests';
import { useEventSuppliers } from './eventSuppliers';
import { useMyEvent } from './myEvent';

interface EventVariablesContextType {
  unsetVariables: () => void;
}

const EventVariablesContext = createContext({} as EventVariablesContextType);

const EventVariablesProvider: React.FC = ({ children }) => {
  const { unsetEventVariables } = useMyEvent();
  const { unsetEventGuestVariables } = useEventGuests();
  const { unsetEventSuppliersVariables } = useEventSuppliers();

  function unsetVariables() {
    unsetEventVariables();
    unsetEventGuestVariables();
    unsetEventSuppliersVariables();
  }

  return (
    <EventVariablesContext.Provider
      value={{
        unsetVariables,
      }}
    >
      {children}
    </EventVariablesContext.Provider>
  );
}

function useEventVariables(): EventVariablesContextType {
  const context = useContext(EventVariablesContext);

  if (!context) throw new Error('useEventVariables must be used within an AuthProvider!')
  return context;
}

export { EventVariablesProvider, useEventVariables };
