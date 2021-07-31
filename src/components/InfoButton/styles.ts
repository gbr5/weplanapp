import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(BorderlessButton)`
  position: absolute;
  z-index: 2;
  left: 16px;
  top: 16px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 4px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.color.primary};
`;
