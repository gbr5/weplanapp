import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import Button from '../Button';

import WindowContainer from '../WindowContainer';

import { Container } from './styles';

interface IProps {
  closeWindow: () => void;
  selectDate: (date: Date) => void;
  selectedDate: Date;
  loading: boolean;
  zIndex?: number;
}

export function DatePickerWindow({
  closeWindow,
  selectDate,
  selectedDate,
  loading,
  zIndex,
}: IProps) {
  const [date, setDate] = useState(selectedDate);
  function handleSelectDate() {
    selectDate(date);
    closeWindow();
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={zIndex ? zIndex : 25}
      top="10%"
      left="0%"
      height="50%"
      width="100%"
    >
      <Container>
        <DatePicker
          onDateChange={setDate}
          date={date}
          mode="date"
          locale="pt-BR"
        />
        <Button loading={loading} onPress={handleSelectDate}>Selecionar</Button>
      </Container>
    </WindowContainer>
  );
}
