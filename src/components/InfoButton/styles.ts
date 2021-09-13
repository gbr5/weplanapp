import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  position: absolute;
  z-index: 2;
  left: 16px;
  top: 16px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  padding: 4px;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(28)}px;
  color: ${({ theme }) => theme.color.info};
`;
