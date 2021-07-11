import React, { useEffect, useState } from 'react';
import ISectionProps from '../../../../dtos/ISectionProps';
import { useEvent } from '../../../../hooks/event';
import MyEventsAsHost from '../MyEventsAsHost';
import MyEventsAsMember from '../MyEventsAsMember';
import NextEvent from '../NextEvent';

import {
  Container,
} from './styles';

const MyEventsSection: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('host');
  const { getNextEvent, getEventsAsOwner } = useEvent();

  function handleSection({ section }: ISectionProps) {
    setSelectedSection(section);
  }

  useEffect(() => {
    getNextEvent();
  }, [getNextEvent]);

  useEffect(() => {
    getEventsAsOwner();
  }, [getEventsAsOwner]);

  return (
    <Container>
      <NextEvent />
      <MyEventsAsHost
        handleSection={(e: ISectionProps) => handleSection(e)}
        selectedSection={selectedSection}
      />
      <MyEventsAsMember
        handleSection={handleSection}
        selectedSection={selectedSection}
      />
    </Container>
  );
};

export default MyEventsSection;
