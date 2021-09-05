import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../global/styles/theme';
import { Container } from './styles';

interface IStyle {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}
interface IProps {
  closeFunction: () => void;
  style?: IStyle;
}

const CloseButton: React.FC<IProps> = ({ closeFunction, style }) => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.iconButtonShadow;

  return (
    <Container
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation: 5,
        top: (style && style.top) ? style.top : '4%',
        right: (style && style.right) ? style.right : '4%',
        left: (style && style.left) && style.left,
        bottom: (style && style.bottom) && style.bottom,
      }}
      onPress={closeFunction}
    >
      <Icon color={theme.color.atention} name="plus" size={30} />
    </Container>
  )
};

export default CloseButton;
