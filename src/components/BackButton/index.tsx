import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../global/styles/theme';
import { Container } from './styles';

interface IProps {
  unsetVariables?: () => void;
  shadow?: boolean;
}

const BackButton: React.FC<IProps> = ({
  unsetVariables,
  shadow,
}) => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.menuShadow;
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    unsetVariables && unsetVariables();
    navigation.goBack();
  }, [navigation]);

  return (
    <Container
      style={shadow && {
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      onPress={goBack}
    >
      <Icon size={40} name="chevron-left" />
    </Container>
  );
};

export default BackButton;
