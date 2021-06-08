import { DateTimePickerResult, Event } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Platform, Text } from 'react-native';
import Button from '../../../../components/Button';
import DateTimeLineView from '../../../../components/DateTimeLineView';
import DateTimePickerComponent from '../../../../components/DateTimePickerComponent';
import { useAuth } from '../../../../hooks/auth';
import MyEventsButton from '../../components/MyEventsButton';

import {
  Container,
  Title,
  Header,
  HeaderTitle,
  UserName,
  Body,
  ProfileButton,
  UserAvatar,
} from './styles';

interface IDatePickerResults {
  event: Event;
  date?: Date | undefined;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>
            {user.name}
          </UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
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
