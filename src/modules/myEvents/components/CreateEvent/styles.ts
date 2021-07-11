import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.text3};
  width: 90%;
  height: 88%;
  border-radius: 16px;
  padding: 8px;
  margin: 16px;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  margin-right: 12px;
`;
