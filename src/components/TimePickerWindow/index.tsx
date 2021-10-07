import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import theme from '../../global/styles/theme';
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

export function TimePickerWindow({
  closeWindow,
  selectDate,
  selectedDate,
  loading,
  zIndex,
}: IProps) {
  const [date, setDate] = useState(selectedDate);
  async function handleSelectDate() {
    await selectDate(date);
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
          dividerHeight={8}
          style={{
            width: 350,
            height: 230,
            aspectRatio: 1.5,
            borderRadius: 2,
            backgroundColor: theme.color.text5,
            flex: 1,
          }}
          onDateChange={setDate}
          date={date}
          mode="time"
          locale="pt-BR"
        />
      </Container>
      <Button loading={loading} onPress={handleSelectDate}>Selecionar</Button>
    </WindowContainer>
  );
}
