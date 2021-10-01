import React, { createContext, useContext } from 'react';
import { useEventGuests } from './eventGuests';
import { useEventSuppliers } from './eventSuppliers';
import { useEventVariables } from './eventVariables';
import { useMyEvent } from './myEvent';

interface UnsetEventVariablesContextType {
  resetEvent: () => void;
}

const UnsetEventVariablesContext = createContext({} as UnsetEventVariablesContextType);

const UnsetEventVariablesProvider: React.FC = ({ children }) => {
  const { unsetVariables } = useEventVariables();
  const { unsetEventVariables } = useMyEvent();
  const { unsetEventGuestVariables } = useEventGuests();
  const { unsetEventSuppliersVariables } = useEventSuppliers();

  function resetEvent() {
    unsetVariables();
    unsetEventVariables();
    unsetEventGuestVariables();
    unsetEventSuppliersVariables();
  }

  return (
    <UnsetEventVariablesContext.Provider
      value={{
        resetEvent,
      }}
    >
      {children}
    </UnsetEventVariablesContext.Provider>
  );
}

function useUnsetEventVariables(): UnsetEventVariablesContextType {
  const context = useContext(UnsetEventVariablesContext);

  if (!context) throw new Error('useUnsetEventVariables must be used within an AuthProvider!')
  return context;
}

export { UnsetEventVariablesProvider, useUnsetEventVariables };
