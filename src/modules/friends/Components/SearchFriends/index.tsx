import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Backdrop from '../../../../components/Backdrop';
import IFriendDTO from '../../../../dtos/IFriendDTO';
import theme from '../../../../global/styles/theme';
import { useFriends } from '../../../../hooks/friends';

import {
  Container,
  CloseButton,
  CloseIcon,
  Input,
  InputContainer,
  SearchButton,
} from './styles';

interface IProps {
  handleFriends: (data: IFriendDTO[]) => void;
}

export function SearchFriends({
  handleFriends,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.iconButtonShadow;
  const inputRef = useRef<TextInput>(null);

  const { friends } = useFriends();

  const [backdrop, setBackdrop] = useState(false);
  const [filterString, setFilterString] = useState<string | undefined>(undefined);

  function handleResetSearch() {
    setFilterString(undefined);
    inputRef.current && inputRef.current.clear();
    Keyboard.dismiss();
    setBackdrop(false);
    handleFriends(friends);
  }

  function handleOffSearch() {
    Keyboard.dismiss();
    setBackdrop(false);
  }

  const handleLookForTransaction = useCallback((data: string) => {
    setFilterString(data);
    if (data === '') return handleFriends(friends);
    setBackdrop(true);
    const finrFriends = friends.filter(({ friend }) => {
      return friend.name.toLowerCase().includes(data.toLowerCase());
    });
    handleFriends(finrFriends);
  }, []);

  const isActive = useMemo(() => {
    return filterString && filterString !== '' ? true : false;
  },
  [filterString]);

  return (
    <>
      {backdrop && (
        <Backdrop
          left="-10%"
          width="120%"
          zIndex={2}
          closeFunction={handleOffSearch}
        />
      )}
      <Container
        style={{
          zIndex: backdrop ? 3 : 1,
        }}
      >
        <InputContainer
          style={{
            shadowColor: isActive ? theme.color.text1 : 'rgba(0,0,0,0)',
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
          {filterString !== undefined && (
            <CloseButton
              style={{
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
              }}
              onPress={handleResetSearch}
            >
              <CloseIcon name="x" />
            </CloseButton>
          )}
          <Input
            ref={inputRef}
            placeholderTextColor={theme.color.text1}
            placeholder="Filtrar por ..."
            onChangeText={(e) => handleLookForTransaction(e)}
          />
          <SearchButton>
            <Feather name="search" size={24} />
          </SearchButton>
        </InputContainer>
      </Container>
    </>
  );
}
