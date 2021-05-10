import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../../../components/Button';
import { useAuth } from '../../../../hooks/auth';

import { Container, GoBackButton, Title } from './styles';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const navigateToDashboard = useCallback(() => {
    navigation.navigate('Dashboard');
  }, [navigation]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);
  return (
    <Container>
      <GoBackButton onPress={navigateToDashboard}>
        <Icon name="arrow-left" size={20} />
      </GoBackButton>
      <Text>Profile</Text>
      <Title>
        Usuário:
        {' '}
        {user.name}
      </Title>
      <Title>
        E-mail:
        {' '}
        {user.email}
      </Title>
      <Button onPress={handleSignOut}>Sair</Button>
    </Container>
  );
};

export default Profile;
