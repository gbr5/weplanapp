import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Backdrop from '../../../../components/Backdrop';
import IUserDTO from '../../../../dtos/IUserDTO';
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
  handleUsers: (data: IUserDTO[]) => void;
}

export function SearchUsers({
  handleUsers,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.iconButtonShadow;
  const inputRef = useRef<TextInput>(null);

  const { getUsersByUserName } = useFriends();

  const [backdrop, setBackdrop] = useState(false);
  const [filterString, setFilterString] = useState<string | undefined>(undefined);

  function handleResetSearch() {
    setFilterString(undefined);
    inputRef.current && inputRef.current.clear();
    Keyboard.dismiss();
    setBackdrop(false);
    handleUsers([]);
  }

  function handleOffSearch() {
    Keyboard.dismiss();
    setBackdrop(false);
  }

  const handleLookForTransaction = useCallback(async (data: string) => {
    setFilterString(data);
    if (data === '') return handleUsers([]);
    setBackdrop(true);
    const users = await getUsersByUserName(data);
    const findUsers = users.filter(user => {
      return user.name.toLowerCase().includes(data.toLowerCase());
    });
    handleUsers(findUsers);
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
          zIndex={24}
          closeFunction={handleOffSearch}
        />
      )}
      <Container
        style={{
          zIndex: backdrop ? 25 : 1,
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
