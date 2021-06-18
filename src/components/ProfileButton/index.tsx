import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useCallback } from 'react';
import profilePlaceholder from '../../assets/profilePlaceholder.jpeg';
import { useAuth } from '../../hooks/auth';

import { Container, UserAvatar } from './styles';

const ProfileButton: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const navigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <Container onPress={navigateToProfile}>
      {user.avatar_url ? (
        <UserAvatar source={{ uri: user.avatar_url }} />
      ) : (
        <UserAvatar source={profilePlaceholder} />
      )}
    </Container>
  );
};

export default ProfileButton;
