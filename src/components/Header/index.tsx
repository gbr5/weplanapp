import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/headerLogo.png';
import profilePlaceholder from '../../assets/placeholder.png';
import MenuButton from '../MenuButton';

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
      <MenuButton />
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
