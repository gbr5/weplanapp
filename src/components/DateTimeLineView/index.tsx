import React from 'react';
import formatDateToString from '../../utils/formatDateToString';

import { Container, StringDate } from './styles';

interface IProps {
  date: Date;
}

const DateTimeLineView: React.FC<IProps> = ({ date }) => (
  <Container>
    <StringDate>{formatDateToString(String(date))}</StringDate>
  </Container>
);

export default DateTimeLineView;
