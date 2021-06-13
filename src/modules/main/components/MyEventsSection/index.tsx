import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useEvent } from '../../../../hooks/event';
import MyEventsAsHost from '../MyEventsAsHost';
import MyEventsAsMember from '../MyEventsAsMember';
import NextEvent from '../NextEvent';

import {
  Container,
} from './styles';

const MyEventsSection: React.FC = () => {
  const { getNextEvent, getEventsAsOwner, nextEvent } = useEvent();

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
