import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const TextAreaContainer = styled.View`
  width: 100%;
  padding: 0 16px;
  background: ${({ theme }) => theme.color.text5};
  margin: 16px 0 16px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.color.text2};
`;

export const TextAreaInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.color.text1};
  font-family: 'RobotoSlab-Regular';
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(26)}px;
`;

export const NumberOfCharacters = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: 'RobotoSlab-Regular';
  font-size: ${RFValue(16)}px;
`;

export const SendButtonText = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: 'RobotoSlab-Regular';
  font-size: ${RFValue(20)}px;
`;

export const SendButton = styled(RectButton)`
  width: 100%;
  border-radius: 5px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.primary};
  margin: 4px auto;
`;
