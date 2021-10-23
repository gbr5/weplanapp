import React, { useEffect, useState } from 'react';
import { useEvent } from '../../../../hooks/event';
import { MyEventsAs } from '../MyEventsAs';
import NextEvent from '../NextEvent';

import {
  Container,
} from './styles';

const MyEventsSection: React.FC = () => {
  const {
    getNextEvent,
    getEventsAsOwner,
    getEventsAsMember,
    getEventsAsGuest,
  } = useEvent();

  useEffect(() => {
    getNextEvent();
  }, []);

  useEffect(() => {
    getEventsAsOwner();
  }, []);

  useEffect(() => {
    getEventsAsMember();
  }, []);

  useEffect(() => {
    getEventsAsGuest();
  }, []);

  return (
    <Container>
      <NextEvent />
      <MyEventsAs thisSection="host" />
      <MyEventsAs thisSection="member" />
      <MyEventsAs thisSection="guest" />
    </Container>
  );
};

export default MyEventsSection;
