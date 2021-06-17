import React, { useEffect } from 'react';
import { useEvent } from '../../../../hooks/event';
import MyEventsAsHost from '../MyEventsAsHost';
import MyEventsAsMember from '../MyEventsAsMember';
import NextEvent from '../NextEvent';

import {
  Container,
} from './styles';

const MyEventsSection: React.FC = () => {
  const { getNextEvent, getEventsAsOwner } = useEvent();

  useEffect(() => {
    getNextEvent();
  }, [getNextEvent]);

  useEffect(() => {
    getEventsAsOwner();
  }, [getEventsAsOwner]);

  return (
    <Container>
      <NextEvent />
      <MyEventsAsHost />
      <MyEventsAsMember />
    </Container>
  );
};

export default MyEventsSection;
