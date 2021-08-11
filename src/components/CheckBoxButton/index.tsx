import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather'

import theme from '../../global/styles/theme';

import {
  Container,
  Icon,
} from './styles';

interface IProps {
  isActive: boolean;
  handleIsActive: () => Promise<void>;
  loading: boolean;
  iconSize?: number;
  margin?: string;
}

export function CheckBoxButton({
  handleIsActive,
  iconSize,
  isActive,
  margin,
  loading,
}: IProps) {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  } = theme.buttonShadow;
  return (
    <Container
      onPress={handleIsActive}
      style={{
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        margin,
      }}
    >
      {loading ? (
        <Feather name="loader" size={RFValue(iconSize ?? 24)} />
      ) : (
        isActive ? (
          <Icon
            name="check-square"
            isActive
            iconSize={iconSize ?? 24}
          />
        ) : (
          <Icon name="square" isActive={false} iconSize={iconSize ?? 24} />
        )
      )}
    </Container>
  );
}
