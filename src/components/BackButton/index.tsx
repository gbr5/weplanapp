import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Container } from './styles';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container onPress={goBack}>
      <Icon size={40} name="chevron-left" />
    </Container>
  );
};

export default BackButton;
