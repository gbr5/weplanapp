import React from 'react';

import { AuthProvider } from './auth';
import { EventProvider } from './event';
import { MyEventProvider } from './myEvent';
import { EventGuestsProvider } from './eventGuests';
import { EventTasksProvider } from './eventTasks';
import { EventInfoProvider } from './eventInfo';
import { NoteProvider } from './notes';
import { EventSuppliersProvider } from './eventSuppliers';
import { EventOwnersProvider } from './eventOwners';
import { EventMembersProvider } from './eventMembers';
import { TransactionProvider } from './transactions';
import { UnsetEventVariablesProvider } from './unsetEventVariables';
import { UserContactsProvider } from './userContacts';
import { ProfileProvider } from './profile';
import { FilesProvider } from './files';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ProfileProvider>
      <EventProvider>
        <MyEventProvider>
          <NoteProvider>
            <FilesProvider>
              <EventGuestsProvider>
                <EventTasksProvider>
                  <EventSuppliersProvider>
                    <EventOwnersProvider>
                      <EventMembersProvider>
                        <EventInfoProvider>
                          <TransactionProvider>
                            <UserContactsProvider>
                              <UnsetEventVariablesProvider>
                                {children}
                              </UnsetEventVariablesProvider>
                            </UserContactsProvider>
                          </TransactionProvider>
                        </EventInfoProvider>
                      </EventMembersProvider>
                    </EventOwnersProvider>
                  </EventSuppliersProvider>
                </EventTasksProvider>
              </EventGuestsProvider>
            </FilesProvider>
          </NoteProvider>
        </MyEventProvider>
      </EventProvider>
    </ProfileProvider>
  </AuthProvider>
);

export default AppProvider;
