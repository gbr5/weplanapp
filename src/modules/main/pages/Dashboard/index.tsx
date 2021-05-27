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
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';

interface IDatePickerResults {
  event: Event;
  date?: Date | undefined;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => state);
  }, []);

  const handleDateChange = useCallback(({ event, date }: IDatePickerResults) => {
    Platform.OS === 'android' && setShowDatePicker(false);
    date && date !== undefined && setSelectedDate(date);
  }, []);

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
