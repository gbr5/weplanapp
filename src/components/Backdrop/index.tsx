import React from 'react';
import { Container } from './styles';

interface IProps {
  closeFunction: () => void;
  zIndex: number;
}

const Backdrop: React.FC<IProps> = ({
  closeFunction,
  zIndex,
}) => (
  <Container zIndex={zIndex} onPress={closeFunction} />
);

export default Backdrop;
