import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin: 48px 0 32px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  text-align: center;
`;

export const Underline = styled.View`
  width: 100%;
  height: 1.5px;
  background-color: ${({ theme }) => theme.color.primary};
  margin: 8px 0 16px;
`;

export const FormQuestion = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto};
  margin: 16px 0 8px;
`;
