import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  position: absolute;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => theme.color.text6};
  padding: 4px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.color.atention};
  font-size: ${RFValue(24)}px;
`;
