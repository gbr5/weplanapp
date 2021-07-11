import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  height: 64px;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text6};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  margin-right: 12px;
`;
