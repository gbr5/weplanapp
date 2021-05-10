import React from 'react';
import DateTimePicker, { DatePickerOptions, Event } from '@react-native-community/datetimepicker';

import { Container, Title } from './styles';

interface IDatePickerResults {
  event: Event;
  date?: Date | undefined;
}

interface IProps extends DatePickerOptions {
  mode: 'date' | 'countdown' | 'datetime' | 'time';
  handleChange: () => void;
}

// lib stoped being maintained!

const DateTimePickerComponent: React.FC<IProps> = ({ mode, handleChange, ...rest }) => {
  console.log(rest);
  return (
    <Container>
      <Title>Escolha a data</Title>
      {/* {handleChange && ( */}
      {/* <DateTimePicker
        // mode={mode}
        onChange={(e) => handleChange(e)}
        display={rest.display || 'calendar'}
        value={rest.value}
      /> */}
      {/* )} */}
    </Container>
  );
};

export default DateTimePickerComponent;
