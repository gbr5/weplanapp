import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';

import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import { useTransaction } from '../../../../../hooks/transactions';

import Button from '../../../../../components/Button';
import { DatePickerWindow } from '../../../../../components/DatePickerWindow';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';

import {
  Container,
  Option,
  Icon,
  Text,
  CancelOption,
  CancelIcon,
  CancelText,
  Body,
  DateContainer,
  DateTitle,
  DateButton,
  DateText,
} from './styles';
import theme from '../../../../../global/styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export function TransactionsFilterWindow() {
  const {
    cancelledTransactionFilter,
    sortTransactionsByInterval,
    fromDateTransactionFilter,
    toDateTransactionFilter,
    filterTransactionOption,
    handleFilterTransactionOption,
    handleCancelledTransactionFilter,
    handleSortTransactionsByIntervalFilter,
    handleFromDateTransactionFilter,
    handleToDateTransactionFilter,
    handleFilterTransactionWindow,
  } = useTransaction();
  const [fromDateWindow, setFromDateWindow] = useState(false);
  const [toDateWindow, setToDateWindow] = useState(false);

  function handleFromDateWindow() {
    setFromDateWindow(!fromDateWindow);
  }
  function handleToDateWindow() {
    setToDateWindow(!toDateWindow);
  }
  return (
    <WindowContainer
      closeWindow={handleFilterTransactionWindow}
      zIndex={15}
      top="5%"
      left="0%"
      height="85%"
      width="100%"
    >
      {fromDateWindow && (
        <DatePickerWindow
          zIndex={19}
          closeWindow={handleFromDateWindow}
          loading={false}
          selectDate={(date: Date) => handleFromDateTransactionFilter(date)}
          selectedDate={fromDateTransactionFilter}
        />
      )}
      {toDateWindow && (
        <DatePickerWindow
          zIndex={18}
          closeWindow={handleToDateWindow}
          loading={false}
          selectDate={(date: Date) => handleToDateTransactionFilter(date)}
          selectedDate={toDateTransactionFilter}
        />
      )}
      <Container>
        <WindowHeader overTitle="Filtrar" title="Transações" />
        <Option onPress={() => handleFilterTransactionOption('all')}>
          <Text>Todas</Text>
          {filterTransactionOption === 'all' ? (
            <Icon name="check-square" />
          ) : (
            <Icon name="square" />
          )}
        </Option>
        <Option onPress={() => handleFilterTransactionOption('paid')}>
          <Text>Pagas</Text>
          {filterTransactionOption === 'paid' ? (
            <Icon name="check-square" />
          ) : (
            <Icon name="square" />
          )}
        </Option>
        <Option onPress={() => handleFilterTransactionOption('notPaid')}>
          <Text>Não Pagas</Text>
          {filterTransactionOption === 'notPaid' ? (
            <Icon name="check-square" />
          ) : (
            <Icon name="square" />
          )}
        </Option>
        <Option onPress={() => handleFilterTransactionOption('delayed')}>
          <Text>Atrasadas</Text>
          {filterTransactionOption === 'delayed' ? (
            <Icon name="check-square" />
          ) : (
            <Icon name="square" />
          )}
        </Option>

        <CancelOption onPress={handleCancelledTransactionFilter}>
          <CancelText>Mostrar canceladas</CancelText>
          {cancelledTransactionFilter ? (
            <CancelIcon name="check-square" />
          ) : (
            <CancelIcon name="square" />
          )}
        </CancelOption>
        <Option onPress={handleSortTransactionsByIntervalFilter}>
          <Text>Filtrar por data</Text>
          {sortTransactionsByInterval ? (
            <Feather size={RFValue(32)} color={theme.color.atention} name="chevron-up" />
          ) : (
            <Icon name="chevron-down" />
          )}
        </Option>
        {sortTransactionsByInterval && (
          <Body>
            <DateContainer>
              <DateTitle>Do dia</DateTitle>
              <DateButton onPress={handleFromDateWindow}>
                <DateText>{formatOnlyDateShort(String(fromDateTransactionFilter))}</DateText>
              </DateButton>
            </DateContainer>
            <DateContainer>
              <DateTitle>Até o dia</DateTitle>
              <DateButton onPress={handleToDateWindow}>
                <DateText>{formatOnlyDateShort(String(toDateTransactionFilter))}</DateText>
              </DateButton>
            </DateContainer>
          </Body>
        )}
      </Container>
      <Button onPress={handleFilterTransactionWindow} >Filtrar</Button>
    </WindowContainer>
  );
}
