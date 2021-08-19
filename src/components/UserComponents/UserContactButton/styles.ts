import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.TouchableOpacity`
  border-radius: 5px;
  border: 0.3px solid ${({ theme }) => theme.color.text3};
  padding: 8px;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 80px;
  margin: 0 4px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
`;
