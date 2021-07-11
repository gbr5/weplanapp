import React from 'react';

import { AuthProvider } from './auth';
import { EventProvider } from './event';
import { MyEventProvider } from './myEvent';
import { EventGuestsProvider } from './eventGuests';
import { EventTasksProvider } from './eventTasks';
import { EventInfoProvider } from './eventInfo';
import { NoteProvider } from './notes';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <EventProvider>
      <MyEventProvider>
        <NoteProvider>
          <EventGuestsProvider>
            <EventTasksProvider>
              <EventInfoProvider>
                {children}
              </EventInfoProvider>
            </EventTasksProvider>
          </EventGuestsProvider>
        </NoteProvider>
      </MyEventProvider>
    </EventProvider>
  </AuthProvider>
);

export default AppProvider;
