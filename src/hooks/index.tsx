import React from 'react';

import { AuthProvider } from './auth';
import { EventProvider } from './event';
import { MyEventProvider } from './myEvent';
import { EventGuestsProvider } from './eventGuests';
import { EventInfoProvider } from './eventInfo';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <EventProvider>
      <MyEventProvider>
        <EventGuestsProvider>
          <EventInfoProvider>
            {children}
          </EventInfoProvider>
        </EventGuestsProvider>
      </MyEventProvider>
    </EventProvider>
  </AuthProvider>
);

export default AppProvider;
