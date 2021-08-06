import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 0 16px;
  background: ${({ theme }) => theme.color.primary};
  width: 100%;
  border-top-width: 1px;
  border-color: #232129;
  /* height: 64px; */
  border-radius: 5px;
  margin-bottom: 32px;
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
