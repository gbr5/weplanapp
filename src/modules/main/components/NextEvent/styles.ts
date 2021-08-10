import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.color.text6};
  border-radius: 8px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.color.text4};
`;

export const Label = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.color.text1};
  letter-spacing: 1px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  padding-left: 8px;
`;

export const LabelUnderline = styled.View`
  width: 80%;
  height: 1.5px;
  margin-left: 0;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const Name = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
  text-align: center;
  margin: 8px 0;
  letter-spacing: 1.5px;
`;

export const Date = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.color.text3};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
  text-align: right;
  letter-spacing: 1px;
`;
