import React, { useCallback, useMemo, useState, useRef } from 'react';
import { Keyboard, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import theme from '../../../../../global/styles/theme';

import { useAuth } from '../../../../../hooks/auth';
import { useEventGuests } from '../../../../../hooks/eventGuests';
import { useMyEvent } from '../../../../../hooks/myEvent';

import Backdrop from '../../../../../components/Backdrop';
import { MenuBooleanButton } from '../../../../../components/MenuBooleanButton';
import { SectionHeader } from '../../../../../components/SectionHeader';
import GuestSectionButton from '../GuestSectionButton';

import {
  Container,
  GuestsContainer,
  InputContainer,
  Input,
  CloseButton,
  CloseIcon,
  FilterButton,
  FilterIcon,
  SearchButton,
  FilterContainer,
} from './styles';
import { useEffect } from 'react';

const GuestsSection: React.FC = () => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.iconButtonShadow;
  const inputRef = useRef<TextInput>(null);
  const { user } = useAuth();
  const { guests, owners, members } = useMyEvent();
  const {
    allGuestsFilter,
    confirmedGuestsFilter,
    handleGuestSectionInfoWindow,
    handleGuestFilterWindow,
    handleNewGuestWindow,
    notConfirmedGuestsFilter,
    onlyMyGuestsFilter,
  } = useEventGuests();

  const [allGuestsSection, setAllGuestsSection] = useState(true);
  const [backdrop, setBackdrop] = useState(false);
  const [filteredGuests, setFilteredGuests] = useState(guests);
  const [filterString, setFilterString] = useState<string | undefined>(undefined);

  const openMyGuests = useCallback(() => {
    setAllGuestsSection(false);
  }, []);

  const openAllGuests = useCallback(() => {
    setAllGuestsSection(true);
  }, []);

  const myGuestSection = useMemo(() => {
    if (owners.length <= 1 && members.length <= 0) return false;
    const findOthersGuests = guests.find(guest => guest.host_id !== user.id);
    return !!findOthersGuests;
  }, []);

  const handleLookForGuest = useCallback((data: string) => {
    setFilterString(data);
    if (data === '') return setFilteredGuests(guests);
    setBackdrop(true);
    const findGuests = guests.filter(guest =>
      guest.first_name.toLowerCase().includes(data.toLowerCase())
      || guest.last_name.toLowerCase().includes(data.toLowerCase())
    );
    setFilteredGuests(findGuests);
  }, [guests])

  function handleResetSearch() {
    setFilterString(undefined);
    inputRef.current && inputRef.current.clear();
    Keyboard.dismiss();
    setBackdrop(false);
    setFilteredGuests(guests);
  }

  function handleOffSearch() {
    Keyboard.dismiss();
    setBackdrop(false);
  }

  useEffect(() => {
    if (allGuestsFilter || !allGuestsFilter
      && confirmedGuestsFilter
      && notConfirmedGuestsFilter
      && !onlyMyGuestsFilter)
        return setFilteredGuests(guests);
    if (!allGuestsFilter
      && confirmedGuestsFilter
      && notConfirmedGuestsFilter
      && onlyMyGuestsFilter)
        return setFilteredGuests(guests.filter(guest => guest.host_id === user.id));
    if (!allGuestsFilter
      && confirmedGuestsFilter
      && !notConfirmedGuestsFilter
      && onlyMyGuestsFilter)
        return setFilteredGuests(
          guests.filter(guest => guest.confirmed && guest.host_id === user.id));
    if (!allGuestsFilter
      && !confirmedGuestsFilter
      && notConfirmedGuestsFilter
      && onlyMyGuestsFilter)
        return setFilteredGuests(
          guests.filter(guest => !guest.confirmed && guest.host_id === user.id));
    if (!allGuestsFilter
      && confirmedGuestsFilter
      && !notConfirmedGuestsFilter
      && !onlyMyGuestsFilter)
        return setFilteredGuests(
          guests.filter(guest => guest.confirmed));
    if (!allGuestsFilter
      && !confirmedGuestsFilter
      && notConfirmedGuestsFilter
      && !onlyMyGuestsFilter)
        return setFilteredGuests(
          guests.filter(guest => !guest.confirmed));
  }, [
    allGuestsFilter,
    confirmedGuestsFilter,
    notConfirmedGuestsFilter,
    onlyMyGuestsFilter,
  ]);

  return (
    <>
      <Container>
        <SectionHeader
          handleAddButton={handleNewGuestWindow}
          handleInfoButton={handleGuestSectionInfoWindow}
          title="Convidados"
        />
        {myGuestSection && (
          <MenuBooleanButton
            firstActive={allGuestsSection}
            firstFunction={openAllGuests}
            firstLabel="Todos"
            secondFunction={openMyGuests}
            secondLabel="Meus"
          />
        )}
        {backdrop && (
          <Backdrop left="-10%" width="120%" zIndex={2} closeFunction={handleOffSearch} />
        )}
        <FilterContainer>
          {backdrop && (
            <Backdrop left="-10%" width="120%" zIndex={2} closeFunction={handleOffSearch} />
          )}
          <FilterButton
            style={{
              shadowColor,
              shadowOffset,
              shadowOpacity,
              shadowRadius,
            }}
            onPress={handleGuestFilterWindow}
          >
            <FilterIcon isActive={!allGuestsFilter} name="filter" />
          </FilterButton>
          <InputContainer>
            {filterString !== undefined && (
              <CloseButton onPress={handleResetSearch}>
                <CloseIcon name="x" />
              </CloseButton>
            )}
            <Input
              ref={inputRef}
              placeholderTextColor={theme.color.text1}
              placeholder="Filtrar por ..."
              onChangeText={(e) => handleLookForGuest(e)}
            />
            <SearchButton onPress={handleOffSearch}>
              <Icon size={24} name="search" />
            </SearchButton>
          </InputContainer>
        </FilterContainer>
        {filteredGuests.length > 0 && (
          <GuestsContainer
            data={filteredGuests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const index = filteredGuests.findIndex((thisGuest) => thisGuest.id === item.id) + 1;

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
