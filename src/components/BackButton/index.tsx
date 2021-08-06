import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../global/styles/theme';
import { useUnsetEventVariables } from '../../hooks/unsetEventVariables';
import { Container } from './styles';

interface IProps {
  unsetVariables?: () => void;
}

const BackButton: React.FC<IProps> = ({
  unsetVariables,
}) => {

  const navigation = useNavigation();

  const goBack = useCallback(() => {
    navigation.goBack();
    unsetVariables && unsetVariables();
  }, [navigation]);

  return (
    <Container
      onPress={goBack}
    >
      <Icon size={40} name="chevron-left" />
    </Container>
  );
};

export default BackButton;
