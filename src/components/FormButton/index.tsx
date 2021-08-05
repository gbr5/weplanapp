import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../global/styles/theme';

import {
  ButtonText,
  Container,
} from './styles';

interface IProps {
  handleSubmit: () => void;
  text: string;
  loading?: boolean;
}
export function FormButton({
  handleSubmit,
  text,
  loading,
}: IProps) {
  const {
    elevation,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.buttonShadow;
  return (
    <Container
      style={{
        elevation,
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      onPress={handleSubmit}>
      {loading ? (
        <Icon name="loader" size={32} />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Container>
  );
}
