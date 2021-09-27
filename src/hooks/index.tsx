import React from 'react';

import { AuthProvider } from './auth';
import { EventProvider } from './event';
import { EventVariablesProvider } from './eventVariables';
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
import { FriendsProvider } from './friends';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ProfileProvider>
      <EventProvider>
        <EventVariablesProvider>
          <MyEventProvider>
            <NoteProvider>
              <FriendsProvider>
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
              </FriendsProvider>
            </NoteProvider>
          </MyEventProvider>
        </EventVariablesProvider>
      </EventProvider>
    </ProfileProvider>
  </AuthProvider>
);

export default AppProvider;
