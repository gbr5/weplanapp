import React from 'react';
import DateTimeLineView from '../../../../components/DateTimeLineView';
import { useAuth } from '../../../../hooks/auth';
import MyEventsSection from '../../components/MyEventsSection';
import Header from '../../../../components/Header';
import {
  Container,
  Title,
  Body,
} from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Header />
      <Body>
        <MyEventsSection />
      </Body>
    </Container>
  );
};

export default Dashboard;
