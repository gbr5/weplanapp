import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  padding: 8px;
  margin: 48px 0 32px;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  margin-right: 12px;
  text-align: center;
`;

export const QuestionText = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  margin: 8px 0 8px;
`;

export const Underline = styled.View`
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 2px;
`;
