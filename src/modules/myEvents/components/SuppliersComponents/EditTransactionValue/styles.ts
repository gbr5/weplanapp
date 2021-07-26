import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  flex: 1;
  margin: 40px 0 16px;
`;

export const ValueContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
  margin-right: 8px;
`;

export const CurrentValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
`;

