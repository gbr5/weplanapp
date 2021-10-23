import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../global/styles/theme';
import { Container } from './styles';

interface IProps {
  onPress: () => void;
}

const BackButton: React.FC<IProps> = ({
  onPress,
}) => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.menuShadow;
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    onPress();
  }, [navigation]);

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 2,
      }}
      onPress={goBack}
    >
      <Icon size={40} name="chevron-left" />
    </Container>
  );
};

export default BackButton;
