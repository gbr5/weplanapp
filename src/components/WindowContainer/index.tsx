import React from 'react';
import Backdrop from '../Backdrop';
import CloseButton from '../CloseButton';

import { Container } from './styles';

interface IProps {
  closeWindow: () => void;
  zIndex: number;
  top: string;
  left: string;
  height: string;
  width: string;
  backdropZIndex?: number;
  elevation?: number;
}

const WindowContainer: React.FC<IProps> = ({
  closeWindow,
  children,
  zIndex,
  height,
  left,
  top,
  width,
  elevation,
}) => (
  <>
    <Backdrop
      zIndex={zIndex ? zIndex : 2}
      closeFunction={closeWindow}
    />
    <Container style={{
      zIndex,
      height,
      left,
      top,
      width,
      elevation,
    }}
    >
      <CloseButton closeFunction={closeWindow} />
      {children}
    </Container>
  </>
);

export default WindowContainer;
