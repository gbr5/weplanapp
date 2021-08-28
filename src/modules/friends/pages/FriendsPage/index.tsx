import React, { useEffect, useMemo, useState } from 'react';
import { AddButton } from '../../../../components/AddButton';
import BackButton from '../../../../components/BackButton';
import { NotificationNumber } from '../../../../components/NotificationNumber';
import ShortConfirmationWindow from '../../../../components/ShortConfirmationWindow';
import { SearchUserButton } from '../../../../components/UserComponents/SearchUserButton';
import { WindowHeader } from '../../../../components/WindowHeader';
import IFriendDTO from '../../../../dtos/IFriendDTO';
import { useFriends } from '../../../../hooks/friends';
import { FriendRequestWindow } from '../../Components/FriendRequestsWindow';
import { SearchFriends } from '../../Components/SearchFriends';
import { SelectUserFriend } from '../../Components/SelectUserFriend';

import {
  Container,
  FriendsContainer,
  SearchContainer,
  RequestsButton,
  RequestsIcon,
} from './styles';

export function FriendsPage() {
  const {
    friends,
    selectUserWindow,
    handleSelectUserWindow,
    deleteFriendWindow,
    selectedFriend,
    handleDeleteFriendWindow,
    deleteFriend,
    friendRequests,
    getFriends,
    getFriendRequests,
    friendRequestsWindow,
    handleFriendRequestsWindow,
  } = useFriends();

  const [filteredFriends, setFilteredFriends] = useState<IFriendDTO[]>(friends);

  async function handleDeleteFriend() {
    await deleteFriend(selectedFriend.id);
    handleDeleteFriendWindow();
  }

  function handleFriends(data: IFriendDTO[]) {
    setFilteredFriends(data);
  }

  useEffect(() => {
    setFilteredFriends(friends);
  }, [friends]);

  useEffect(() => {
    getFriends();
    getFriendRequests();
  }, []);
  const requests = useMemo(() => {
    return {
      number: friendRequests.length,
      isActive: friendRequests.length > 0,
    };
  }, [friendRequests])

  function handleFriendRequests() {
    requests.isActive && handleFriendRequestsWindow();
  }

  return (
    <>
      {selectUserWindow && <SelectUserFriend />}
      {friendRequestsWindow && <FriendRequestWindow />}
      {deleteFriendWindow && (
        <ShortConfirmationWindow
          closeWindow={handleDeleteFriendWindow}
          firstButtonLabel="Deletar"
          firstFunction={handleDeleteFriend}
          question={`Deseja deletar ${selectedFriend.friend.name}?`}
          secondButtonLabel="Não deletar"
          secondFunction={handleDeleteFriendWindow}
        />
      )}
      <Container>
        <BackButton />
        <WindowHeader title="Meu Contatos" />
        <AddButton
          top="6.5%"
          right="4%"
          onPress={handleSelectUserWindow}
        />
        <SearchContainer>
          <RequestsButton onPress={handleFriendRequests}>
            {requests.isActive ? (
              <>
                <NotificationNumber
                  top="-25%"
                  left="-25%"
                  number={requests.number}
                />
                <RequestsIcon name="bell" />
              </>
            ) : (
              <>
                <RequestsIcon name="bell-off" />
              </>
            )}
          </RequestsButton>
          <SearchFriends handleFriends={handleFriends} />
        </SearchContainer>
        {friends.length > 0 && (
          <FriendsContainer
            data={filteredFriends}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <SearchUserButton user={item.friend} />
                // <FriendButton key={item.id} friend={item} />
              );
            }}
          />
        )}
      </Container>
    </>
  );
}
