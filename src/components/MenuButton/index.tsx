import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Container } from './styles';

const MenuButton: React.FC = () => {
  const navigation = useNavigation();

  const handleMenuDrawer = useCallback(() => {
    navigation.navigate('Menu');
  }, [navigation]);

  return (
    <Container onPress={() => handleMenuDrawer()}>
      <Icon size={30} name="menu" />
    </Container>
  );
};

export default MenuButton;
