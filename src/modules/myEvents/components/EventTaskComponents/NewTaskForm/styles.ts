import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  height: 100%;
  margin: 48px 0 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
`;

export const Underline = styled.View`
  height: 2px;
  border-radius: 2px;
  margin: 2px 0 6px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.text1};
`;

export const FormQuestion = styled.Text`
  margin: 16px 0 8px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const DateButton = styled(RectButton)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 12px;
  margin: 16px 0 0;
  align-items: center;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text6};
`;

export const TimeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text6};
`;
