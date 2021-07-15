import React from 'react';

import { AuthProvider } from './auth';
import { EventProvider } from './event';
import { MyEventProvider } from './myEvent';
import { EventGuestsProvider } from './eventGuests';
import { EventTasksProvider } from './eventTasks';
import { EventInfoProvider } from './eventInfo';
import { NoteProvider } from './notes';
import { EventSuppliersProvider } from './eventSuppliers';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <EventProvider>
      <MyEventProvider>
        <NoteProvider>
          <EventGuestsProvider>
            <EventTasksProvider>
              <EventSuppliersProvider>
                <EventInfoProvider>
                  {children}
                </EventInfoProvider>
              </EventSuppliersProvider>
            </EventTasksProvider>
          </EventGuestsProvider>
        </NoteProvider>
      </MyEventProvider>
    </EventProvider>
  </AuthProvider>
);

export default AppProvider;
