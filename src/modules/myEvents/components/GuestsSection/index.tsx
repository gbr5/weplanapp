import React, { useCallback, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IEventGuestDTO from '../../../../dtos/IEventGuestDTO';
import { useMyEvent } from '../../../../hooks/myEvent';
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
  const [myGuestsSection, setMyGuestsSection] = useState(false);

  const renderItem = (guest: IEventGuestDTO) => (
    <GuestSectionButton
      guest={guest}
      key={guest.id}
    />
  );

  const openMyGuests = useCallback(() => {
    setAllGuestsSection(false);
    setMyGuestsSection(true);
  }, []);

  const openAllGuests = useCallback(() => {
    setAllGuestsSection(true);
    setMyGuestsSection(false);
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
            active={myGuestsSection}
            onPress={openMyGuests}
          >
            <GuestMainMenuButtonText active={myGuestsSection}>Meus</GuestMainMenuButtonText>
          </GuestMainMenuButton>
        </GuestMainMenu>
        {/* <SafeAreaView> */}
        {/* {allGuestsSection && (
            <FlatList
              data={guests}
              renderItem={renderItem}
              keyExtractor={(guest) => guest.id}
            />
          )} */}
        <GuestsContainer>
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
        </GuestsContainer>
        {/* </SafeAreaView> */}
      </Container>
    </>
  );
};

export default GuestsSection;
