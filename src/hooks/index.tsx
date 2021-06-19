import React from 'react';

import { AuthProvider } from './auth';
import { EventProvider } from './event';
import { MyEventProvider } from './myEvent';
import { EventGuestsProvider } from './eventGuests';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <EventProvider>
      <MyEventProvider>
        <EventGuestsProvider>
          {children}
        </EventGuestsProvider>
      </MyEventProvider>
    </EventProvider>
  </AuthProvider>
);

export default AppProvider;
