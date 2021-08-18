import React from 'react';
import WindowContainer from '../../../../components/WindowContainer';
import { WindowHeader } from '../../../../components/WindowHeader';
import { useFriends } from '../../../../hooks/friends';

import {
  Container,
  UsersContainer,
} from './styles';
import { FriendRequestButton } from '../FriendRequestButton';

export function FriendRequestWindow() {
  const { handleFriendRequestsWindow, friendRequests } = useFriends();

  return (
    <WindowContainer
      closeWindow={handleFriendRequestsWindow}
      zIndex={15}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <WindowHeader title="Pedidos de amizade" />
        {friendRequests.length > 0 && (
          <UsersContainer
            data={friendRequests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <FriendRequestButton friend={item} />
              );
            }}
          />
        )}
      </Container>
    </WindowContainer>
  );
}
