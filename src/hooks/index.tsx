import React from 'react';

import { AuthProvider } from './auth';
import { EventProvider } from './event';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <EventProvider>{children}</EventProvider>
  </AuthProvider>
);

export default AppProvider;
