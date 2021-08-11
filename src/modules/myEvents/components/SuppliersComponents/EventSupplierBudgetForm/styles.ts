import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
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
  margin: 8px 0;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const DateButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  border: 0.5px solid ${({ theme }) => theme.color.text3};
  padding: 12px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const TimeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text6};
`;
