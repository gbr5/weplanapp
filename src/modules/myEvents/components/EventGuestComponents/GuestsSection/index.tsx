import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useMyEvent } from '../../../../../hooks/myEvent';
import GuestSectionButton from '../GuestSectionButton';
import {
  Container,
  GuestsContainer,
  GuestMainMenu,
  GuestMainMenuButton,
  GuestMainMenuButtonText,
  AddGuestButton,
  AddGuestButtonText,
  AddGuestIcon,
} from './styles';

interface IProps {
  handleNewGuestForm: () => void;
}

const GuestsSection: React.FC<IProps> = ({ handleNewGuestForm }) => {
  const { guests, myGuests } = useMyEvent();
  const [allGuestsSection, setAllGuestsSection] = useState(true);

  const openMyGuests = useCallback(() => {
    setAllGuestsSection(false);
  }, []);

  const openAllGuests = useCallback(() => {
    setAllGuestsSection(true);
  }, []);

  return (
    <>
      <Container>
        <AddGuestButton onPress={handleNewGuestForm}>
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
            active={!allGuestsSection}
            onPress={openMyGuests}
          >
            <GuestMainMenuButtonText active={!allGuestsSection}>Meus</GuestMainMenuButtonText>
          </GuestMainMenuButton>
        </GuestMainMenu>
        {allGuestsSection ? (
          <GuestsContainer
            data={guests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const index = guests.findIndex((thisGuest) => thisGuest.id === item.id) + 1;

              return (
                <GuestSectionButton
                  index={index}
                  guest={item}
                  key={item.id}
                />
              );
            }}
          />
        ) : (
          <GuestsContainer
            data={myGuests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const index = myGuests.findIndex((thisGuest) => thisGuest.id === item.id) + 1;

              return (
                <GuestSectionButton
                  index={index}
                  guest={item}
                  key={item.id}
                />
              );
            }}
          />
        )}
      </Container>
    </>
  );
};

export default GuestsSection;
