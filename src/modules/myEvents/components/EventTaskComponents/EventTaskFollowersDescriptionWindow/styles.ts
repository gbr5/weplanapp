import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-top: 40px;
`;

export const Space = styled.View`
  width: 100%;
  height: 24px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(17)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  margin: 12px 0 8px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
  margin-top: 16px;
  line-height: 26px;
  letter-spacing: 1px;
`;
