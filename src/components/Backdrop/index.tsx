import React from 'react';
import { Container } from './styles';

interface IProps {
  closeFunction: () => void;
  zIndex: number;
  left?: string;
  width?: string;
}

const Backdrop: React.FC<IProps> = ({
  closeFunction,
  zIndex,
  left,
  width,
}) => (
  <Container
    zIndex={zIndex}
    onPress={closeFunction}
    style={{
      left: left ? left : '0%',
      width: width ? width : '100%',
    }}
  />
);

export default Backdrop;
