import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { Container, ButtonText } from './styles';

interface IButtonProps extends RectButtonProperties {
  children: string;
  loading?: boolean;
}

// eslint-disable-next-line react/prop-types
const Button: React.FC<IButtonProps> = ({ children, loading, ...rest }) => (
  <Container {...rest}>
    <ButtonText>
      {loading ? <Icon size={20} name="loader" /> : children}
    </ButtonText>
  </Container>
);

export default Button;
