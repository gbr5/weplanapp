import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import DateTimeLineView from '../../../../components/DateTimeLineView';
import { useAuth } from '../../../../hooks/auth';
import MyEventsButton from '../../components/MyEventsButton';
import Header from '../../../../components/Header';
import {
  Container,
  Title,
  Body,
} from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <Container>
      <Header />
      <Body>
        <DateTimeLineView date={new Date()} />
        <Title>
          Usuário:
          {' '}
          {user.name}
        </Title>
        <MyEventsButton />
      </Body>
    </Container>
  );
};

export default Dashboard;
