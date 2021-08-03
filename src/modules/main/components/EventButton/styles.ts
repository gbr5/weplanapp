import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(BorderlessButton)`
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.text5};
  border: 1px solid ${({ theme }) => theme.color.text4};
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
  margin: 24px 0 0;
  text-align: center;
  letter-spacing: 1px;
`;

export const DateText = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(14)}px;
  padding: 4px;
  text-align: right;
  letter-spacing: 1px;
`;

export const EventDate = styled.Text`
  position: absolute;
  top: 0px;
  left: 0px;
  color: ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(15)}px;
  padding: 4px;
  text-align: right;
  letter-spacing: 1px;
`;
