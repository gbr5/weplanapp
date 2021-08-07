import React, { useMemo, useRef, useState } from 'react';
import { useCallback } from 'react';
import { Keyboard, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import IEventTransactionDTO from '../../../dtos/IEventTransactionDTO';

import theme from '../../../global/styles/theme';
import formatOnlyDateShort from '../../../utils/formatOnlyDateShort';
import Backdrop from '../../Backdrop';

import {
  Container,
  CloseButton,
  CloseIcon,
  Input,
  InputContainer,
  NumberOfTransactions,
  SearchButton,
} from './styles';

interface IProps {
  eventTransactions: IEventTransactionDTO[];
  handleEventTransactions: (data: IEventTransactionDTO[]) => void;
}

export function SearchTransactions({
  eventTransactions,
  handleEventTransactions,
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
    handleEventTransactions(eventTransactions);
  }

  function handleOffSearch() {
    Keyboard.dismiss();
    setBackdrop(false);
  }

  const handleLookForTransaction = useCallback((data: string) => {
    setFilterString(data);
    if (data === '') return handleEventTransactions(eventTransactions);
    setBackdrop(true);
    const findTransactions = eventTransactions.filter(transaction => {
      return transaction.transaction.name.toLowerCase().includes(data.toLowerCase())
      || String(transaction.transaction.amount).toLowerCase().includes(data.toLowerCase())
      || formatOnlyDateShort(String(transaction.transaction.due_date)).includes(data)
      || formatOnlyDateShort(String(transaction.transaction.created_at)).includes(data)
    });
    handleEventTransactions(findTransactions);
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
          style={isActive && {
            shadowColor: theme.color.text1,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
          }}
        >
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
