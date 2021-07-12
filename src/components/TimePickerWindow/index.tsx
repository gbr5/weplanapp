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
}

export function TimePickerWindow({
  closeWindow,
  selectDate,
  selectedDate,
  loading,
}: IProps) {
  const [date, setDate] = useState(selectedDate);
  async function handleSelectDate() {
    await selectDate(date);
    closeWindow();
  }

  return (
    <WindowContainer
      closeWindow={closeWindow}
      zIndex={25}
      top="10%"
      left="0%"
      height="50%"
      width="100%"
    >
      <Container>
        <DatePicker
          onDateChange={setDate}
          date={date}
          mode="time"
          locale="pt-BR"
        />
        <Button loading={loading} onPress={handleSelectDate}>Selecionar</Button>
      </Container>
    </WindowContainer>
  );
}
