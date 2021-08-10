import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import INoteDTO from '../../../../../dtos/INoteDTO';
import theme from '../../../../../global/styles/theme';

import Backdrop from '../../../../../components/Backdrop';

import {
  CloseButton,
  CloseIcon,
  Container,
  Input,
  InputContainer,
  SearchButton,
} from './styles';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

interface IProps {
  notes: INoteDTO[];
  handleNotes: (data: INoteDTO[]) => void;
}

export function SearchNotes({
  handleNotes,
  notes,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.iconButtonShadow;
  const inputRef = useRef<TextInput>(null);

  const [backdrop, setBackdrop] = useState(false);
  const [filterString, setFilterString] = useState<string | undefined>(undefined);

  function handleResetSearch() {
    setFilterString(undefined);
    inputRef.current && inputRef.current.clear();
    Keyboard.dismiss();
    setBackdrop(false);
    handleNotes(notes);
  }

  const handleLookForNote = useCallback((data: string) => {
    setFilterString(data);
    if (data === '') return handleNotes(notes);
    setBackdrop(true);
    const findNotes = notes.filter(note => {
      return note.note.toLowerCase().includes(data.toLowerCase())
        || formatOnlyDateShort(String(note.updated_at)).includes(data);
    });
    handleNotes(findNotes);
  }, []);

  function handleOffSearch() {
    Keyboard.dismiss();
    setBackdrop(false);
  }

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
            onChangeText={(e) => handleLookForNote(e)}
          />
          <SearchButton>
            <Feather name="search" size={24} />
          </SearchButton>
        </InputContainer>
      </Container>
    </>
  );
}
