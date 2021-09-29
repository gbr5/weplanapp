import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 8px 16px;
  max-height: 80px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.color.text6};
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;
export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(24)}px;
`;
