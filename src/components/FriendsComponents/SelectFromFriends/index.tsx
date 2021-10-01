import React, { useEffect, useState } from 'react';

import { useFriends } from '../../../hooks/friends';
import theme from '../../../global/styles/theme';

import WindowContainer from '../../WindowContainer';
import { WindowHeader } from '../../WindowHeader';
import profilePlaceholder from '../../../assets/profilePlaceholder.jpeg';
import { SearchFriends } from '../../../modules/friends/Components/SearchFriends';
import IFriendDTO from '../../../dtos/IFriendDTO';
import Button from '../../Button';

import {
  Container,
  FriendsContainer,
  Avatar,
  FriendButton,
  Name,
} from './styles';
import { useEventVariables } from '../../../hooks/eventVariables';

interface IProps {
  handleAddFriends: (data: IFriendDTO[]) => Promise<void>;
  closeWindow: () => void;
}

export function SelectFromFriends({
  handleAddFriends,
  closeWindow,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.objectButtonShadow;
  const { eventOwners, eventMembers, eventGuests } = useEventVariables();
  const { selectedFriends, friends, handleSelectedFriends } = useFriends();

  const [filteredFriends, setFilteredFriends] = useState<IFriendDTO[]>([]);

  useEffect(() => {
    const sortedFriends: IFriendDTO[] = [];
    friends && friends.length > 0 && friends.map(friend => {
      if (!friend.isConfirmed) return [];
      const findFriendOwner = eventOwners.find(
        owner => owner.userEventOwner.id === friend.friend.id,
      );
      const findFriendMember = eventMembers.find(
        owner => owner.userEventMember.id === friend.friend.id,
      );
      const findFriendGuest = eventGuests
        .filter(
          guest =>
            guest.weplanUser && guest.weplanGuest && guest.weplanGuest.id,
        )
        .find(
          owner => owner.weplanGuest.weplanUserGuest.id === friend.friend.id,
        );
      if (!findFriendMember && !findFriendOwner && !findFriendGuest)
        sortedFriends.push(friend);

      return [];
    });
    setFilteredFriends(sortedFriends);
  }, [friends, eventMembers, eventOwners, eventGuests]);
  function handleFilteredFriends(data: IFriendDTO[]) {
    setFilteredFriends(data);
  }

  function handleSelectFriend(data: IFriendDTO) {
    const findFriend = selectedFriends.find(friend => friend.id === data.id);
    if (findFriend) {
      const filtered = selectedFriends.filter(friend => friend.id !== data.id);
      return handleSelectedFriends(filtered);
    }
    handleSelectedFriends([
      ...selectedFriends,
      data,
    ]);
  }

  function handleCloseWindow() {
    handleSelectedFriends([]);
    closeWindow();
  }

  async function handleSelectFriends() {
    await handleAddFriends(selectedFriends);
    handleCloseWindow();
  }

  return (
    <WindowContainer
      closeWindow={handleCloseWindow}
      zIndex={15}
      top="5%"
      left="0%"
      height="90%"
      width="100%"
    >
      <Container>
        <WindowHeader overTitle="Selecionar" title="Amigos" />
        <SearchFriends handleFriends={handleFilteredFriends} />
        {filteredFriends.length > 0 && (
          <FriendsContainer
            data={filteredFriends}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = !!selectedFriends
                .find(friend => friend.id === item.id);
              return (
                <FriendButton
                  style={{
                    shadowColor,
                    shadowOffset,
                    shadowOpacity,
                    shadowRadius,
                  }}
                  key={item.id}
                  onPress={() => handleSelectFriend(item)}
                  isSelected={isSelected}
                >
                  <Avatar source={!item.friend.avatar_url
                    ? profilePlaceholder
                    : { uri: item.friend.avatar_url }}
                  />
                  <Name>{item.friend.name}</Name>
                </FriendButton>
              );
            }}
          />
        )}
        {selectedFriends.length > 0 && (
          <Button onPress={handleSelectFriends} >Avançar</Button>
        )}
      </Container>
    </WindowContainer>
  );
}
