import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Container } from './styles';

interface IProps {
  closeFunction: () => void;
}

const CloseButton: React.FC<IProps> = ({ closeFunction }) => (
  <Container onPress={closeFunction}>
    <Icon name="plus" size={30} />
  </Container>
);

export default CloseButton;
