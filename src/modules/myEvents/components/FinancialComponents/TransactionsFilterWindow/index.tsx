import React from 'react';
import { useState } from 'react';
import Button from '../../../../../components/Button';
import { DatePickerWindow } from '../../../../../components/DatePickerWindow';
import WindowContainer from '../../../../../components/WindowContainer';
import { WindowHeader } from '../../../../../components/WindowHeader';
import formatOnlyDateShort from '../../../../../utils/formatOnlyDateShort';

import {
  Container,
  CancelOption,
  CancelIcon,
  CancelText,
  Body,
  DateContainer,
  DateTitle,
  DateButton,
  DateText,
} from './styles';

interface IProps {
  cancelled: boolean;
  sortByInterval: boolean;
  fromDate: Date;
  toDate: Date;
  handleCloseWindow: () => void;
  handleCancelled: () => void;
  handleSortByInterval: () => void;
  handleFromDate: (date: Date) => void;
  handleToDate: (date: Date) => void;
}

export function TransactionsFilterWindow({
  cancelled,
  sortByInterval,
  fromDate,
  toDate,
  handleCloseWindow,
  handleCancelled,
  handleFromDate,
  handleSortByInterval,
  handleToDate,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [fromDateWindow, setFromDateWindow] = useState(false);
  const [toDateWindow, setToDateWindow] = useState(false);

  function handleFromDateWindow() {
    setFromDateWindow(!fromDateWindow);
  }
  function handleToDateWindow() {
    setToDateWindow(!toDateWindow);
  }
  function closeWindow() {
    handleCloseWindow();
  }
  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={15}
      top="0%"
      left="0%"
      height="100%"
      width="100%"
    >
      {fromDateWindow && (
        <DatePickerWindow
          zIndex={19}
          closeWindow={handleFromDateWindow}
          loading={loading}
          selectDate={(date: Date) => handleFromDate(date)}
          selectedDate={fromDate}
        />
      )}
      {toDateWindow && (
        <DatePickerWindow
          zIndex={18}
          closeWindow={handleToDateWindow}
          loading={loading}
          selectDate={(date: Date) => handleToDate(date)}
          selectedDate={toDate}
        />
      )}
      <Container>
        <WindowHeader title="Filtrar Transações" />
        <CancelOption onPress={handleCancelled}>
          <CancelText>Transações canceladas</CancelText>
          {cancelled ? (
            <CancelIcon name="check-square" />
          ) : (
            <CancelIcon name="square" />
          )}
        </CancelOption>
        <CancelOption onPress={handleSortByInterval}>
          <CancelText>Filtrar por data</CancelText>
          {sortByInterval ? (
            <CancelIcon name="check-square" />
          ) : (
            <CancelIcon name="square" />
          )}
        </CancelOption>
        {sortByInterval && (
          <Body>
            <DateContainer>
              <DateTitle>Do dia</DateTitle>
              <DateButton onPress={handleFromDateWindow}>
                <DateText>{formatOnlyDateShort(String(fromDate))}</DateText>
              </DateButton>
            </DateContainer>
            <DateContainer>
              <DateTitle>Até o dia</DateTitle>
              <DateButton onPress={handleToDateWindow}>
                <DateText>{formatOnlyDateShort(String(toDate))}</DateText>
              </DateButton>
            </DateContainer>
          </Body>
        )}
      </Container>
      <Button onPress={closeWindow} >Filtrar</Button>
    </WindowContainer>
  );
}
