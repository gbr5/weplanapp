import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/headerLogo.png';
import profilePlaceholder from '../../assets/profilePlaceholder.jpeg';

import {
  Container,
  Logo,
  ProfileButton,
  UserAvatar,
} from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <Container>
      <Logo source={logoImg} />
      <ProfileButton onPress={navigateToProfile}>
        {user.avatar_url ? (
          <UserAvatar source={{ uri: user.avatar_url }} />
        ) : (
          <UserAvatar source={profilePlaceholder} />
        )}
      </ProfileButton>
    </Container>
  );
};

export default Header;
