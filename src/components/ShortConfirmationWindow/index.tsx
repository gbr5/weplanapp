import React from 'react';
import Backdrop from '../Backdrop';
import Button from '../Button';
import CloseButton from '../CloseButton';

import {
  ButtonContainer,
  Container,
  Question,
} from './styles';

interface IProps {
  closeWindow: () => void;
  question: string;
  firstButtonLabel: string;
  firstFunction: () => void;
  secondButtonLabel: string;
  secondFunction: () => void;
}

const ShortConfirmationWindow: React.FC<IProps> = ({
  closeWindow,
  question,
  firstButtonLabel,
  firstFunction,
  secondButtonLabel,
  secondFunction,
}) => (
  <>
    <Backdrop closeFunction={closeWindow} />
    <Container>
      <CloseButton closeFunction={closeWindow} />
      <Question>{question}</Question>
      <ButtonContainer>
        <Button onPress={firstFunction}>{firstButtonLabel}</Button>
        <Button onPress={secondFunction}>{secondButtonLabel}</Button>
      </ButtonContainer>
    </Container>
  </>
);

export default ShortConfirmationWindow;
