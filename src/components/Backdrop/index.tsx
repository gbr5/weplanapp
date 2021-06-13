import React from 'react';
import { Container } from './styles';

interface IProps {
  closeFunction: () => void;
}

const Backdrop: React.FC<IProps> = ({
  closeFunction,
}) => (
  <Container onPress={closeFunction} />
);

export default Backdrop;
