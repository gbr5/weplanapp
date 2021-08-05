import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../global/styles/theme';
import { Container } from './styles';

interface IProps {
  closeFunction: () => void;
}

const CloseButton: React.FC<IProps> = ({ closeFunction }) => {
  const {
    elevation,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.iconButtonShadow;

  return (
    <Container
      style={{
        elevation,
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      onPress={closeFunction}
    >
      <Icon color={theme.color.atention} name="plus" size={30} />
    </Container>
  )
};

export default CloseButton;
