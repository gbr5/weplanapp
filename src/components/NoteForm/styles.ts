import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  justify-content: flex-start;
`;

export const TextAreaContainer = styled.View`
  width: 100%;
  min-height: 64px;
  padding: 0 16px;
  background: ${({ theme }) => theme.color.text6};
  margin: 16px 0 16px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  border: none;
`;

export const TextAreaInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
`;

export const NumberOfCharacters = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
`;

export const SendButtonText = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
`;

export const SendButton = styled.TouchableOpacity`
  border-radius: 5px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.primary};
`;
