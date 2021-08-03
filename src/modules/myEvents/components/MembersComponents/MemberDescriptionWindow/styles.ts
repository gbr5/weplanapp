import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 48px;
`;

export const Space = styled.View`
  width: 100%;
  height: 24px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
  margin-top: 16px;
`;
