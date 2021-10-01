import React from 'react';

import { AuthProvider } from './auth';
import { ProfileProvider } from './profile';
import { EventProvider } from './event';
import { EventVariablesProvider } from './eventVariables';
import { MyEventProvider } from './myEvent';
import { NoteProvider } from './notes';
import { FriendsProvider } from './friends';
import { FilesProvider } from './files';
import { EventGuestsProvider } from './eventGuests';
import { EventTasksProvider } from './eventTasks';
import { EventSuppliersProvider } from './eventSuppliers';
import { EventOwnersProvider } from './eventOwners';
import { EventMembersProvider } from './eventMembers';
import { EventInfoProvider } from './eventInfo';
import { TransactionProvider } from './transactions';
import { UserContactsProvider } from './userContacts';
import { UnsetEventVariablesProvider } from './unsetEventVariables';

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
