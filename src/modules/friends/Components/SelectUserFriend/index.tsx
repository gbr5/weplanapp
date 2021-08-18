import React, { useState } from 'react';
import WindowContainer from '../../../../components/WindowContainer';
import { WindowHeader } from '../../../../components/WindowHeader';
import IUserDTO from '../../../../dtos/IUserDTO';
import { useFriends } from '../../../../hooks/friends';
import { SearchUsers } from '../SearchUsers';

import {
  Container,
  UsersContainer,
} from './styles';
import { SearchUserButton } from '../../../../components/UserComponents/SearchUserButton';

export function SelectUserFriend() {
  const { handleSelectUserWindow } = useFriends();
  const [users, setUsers] = useState<IUserDTO[]>([]);

  function handleUsers(data: IUserDTO[]) {
    setUsers(data);
  }

  return (
    <WindowContainer
      closeWindow={handleSelectUserWindow}
      zIndex={15}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <WindowHeader title="Selecionar amigo" />
        <SearchUsers handleUsers={handleUsers} />
        {users.length > 0 && (
          <UsersContainer
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {

              return (
                <SearchUserButton user={item} />
              );
            }}
          />
        )}
      </Container>
    </WindowContainer>
  );
}
