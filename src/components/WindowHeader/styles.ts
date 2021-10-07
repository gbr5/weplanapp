import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const OverTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.secondary};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
`;

export const TitleUnderline = styled.View`
  width: 100%;
  height: 1.5px;
  margin: 8px 0 16px;
  background-color: ${({ theme }) => theme.color.primary};
`;
