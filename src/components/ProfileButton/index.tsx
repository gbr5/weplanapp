import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useCallback } from 'react';
import profilePlaceholder from '../../assets/placeholder.png';
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
      <UserAvatar
        source={!user.avatar_url ? profilePlaceholder : { uri: user.avatar_url }}
      />
    </Container>
  );
};

export default ProfileButton;
