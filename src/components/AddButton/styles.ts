import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  position: absolute;
  z-index: 2;
  right: 16px;
  top: 16px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.primary};
  padding: 4px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.color.text1};
`;
