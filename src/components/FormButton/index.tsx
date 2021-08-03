import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

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
  return (
    <Container onPress={handleSubmit}>
      {loading ? (
        <Icon name="loader" size={32} />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Container>
  );
}
