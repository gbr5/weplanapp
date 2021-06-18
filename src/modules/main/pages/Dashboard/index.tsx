import React from 'react';
import MyEventsSection from '../../components/MyEventsSection';
import Header from '../../../../components/Header';
import {
  Container,
  Body,
} from './styles';

const Dashboard: React.FC = () => (
  <Container>
    <Header />
    <Body>
      <MyEventsSection />
    </Body>
  </Container>
);

export default Dashboard;
