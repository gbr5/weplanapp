import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(17)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  margin: 12px 0 8px;
`;

export const TextOption = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  margin: 4px 0 4px 8px;
`;
