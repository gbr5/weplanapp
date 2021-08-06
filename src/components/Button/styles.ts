import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  margin: 16px auto;
  background: ${({ theme }) => theme.color.primary};
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
