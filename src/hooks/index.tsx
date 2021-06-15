import React from 'react';

import { AuthProvider } from './auth';
import { EventProvider } from './event';
import { MyEventProvider } from './myEvent';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <EventProvider>
      <MyEventProvider>
        {children}
      </MyEventProvider>
    </EventProvider>
  </AuthProvider>
);

export default AppProvider;
