import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useMyEvent } from '../../../../hooks/myEvent';
import GuestSectionButton from '../../pages/GuestSectionButton';
import {
  Container,
  GuestMainMenu,
  GuestMainMenuButton,
  GuestMainMenuButtonText,
  AddGuestButton,
  AddGuestButtonText,
  AddGuestIcon,
} from './styles';

const GuestsSection: React.FC = () => {
  const { guests, myGuests } = useMyEvent();
  const [allGuestsSection, setAllGuestsSection] = useState(true);
  const [myGuestsSection, setMyGuestsSection] = useState(false);

  const openMyGuests = useCallback(() => {
    setAllGuestsSection(false);
    setMyGuestsSection(true);
  }, []);

  const openAllGuests = useCallback(() => {
    setAllGuestsSection(true);
    setMyGuestsSection(false);
  }, []);

  return (
    <Container>
      <AddGuestButton>
        <AddGuestButtonText>Adicionar Convidado</AddGuestButtonText>
        <AddGuestIcon><Icon name="user-plus" size={24} /></AddGuestIcon>
      </AddGuestButton>
      <GuestMainMenu>
        <GuestMainMenuButton
          active={allGuestsSection}
          onPress={openAllGuests}
        >
          <GuestMainMenuButtonText active={allGuestsSection}>Todos</GuestMainMenuButtonText>
        </GuestMainMenuButton>
        <GuestMainMenuButton
          active={myGuestsSection}
          onPress={openMyGuests}
        >
          <GuestMainMenuButtonText active={myGuestsSection}>Meus</GuestMainMenuButtonText>
        </GuestMainMenuButton>
      </GuestMainMenu>
      {allGuestsSection && guests.map((guest) => {
        const index = guests.findIndex((thisGuest) => thisGuest.id === guest.id) + 1;
        return (
          <GuestSectionButton
            guest={guest}
            index={index}
            key={guest.id}
          />
        );
      })}
      {myGuestsSection && myGuests.map((guest) => {
        const index = myGuests.findIndex((thisGuest) => thisGuest.id === guest.id) + 1;
        return (
          <GuestSectionButton
            guest={guest}
            index={index}
            key={guest.id}
          />
        );
      })}
    </Container>
  );
};

export default GuestsSection;
