import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../global/styles/theme';

import { Container, ButtonText } from './styles';

interface IButtonProps extends RectButtonProperties {
  children: string;
  loading?: boolean;
}

// eslint-disable-next-line react/prop-types
const Button: React.FC<IButtonProps> = ({ children, loading, ...rest }) => {
  const {
    elevation,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.buttonShadow

  return (
    <Container
      style={{
        elevation,
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
      }}
      {...rest}
    >
      <ButtonText>
        {loading ? <Icon size={20} name="loader" /> : children}
      </ButtonText>
    </Container>
  );
}

export default Button;
