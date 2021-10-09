import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 100%;
  min-height: 180px;
`;

export const BudgetButton = styled.TouchableOpacity`
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.primary};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  margin-bottom: 6px;
`;

export const Value = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const PercentageUnderline = styled.View`
  background-color: ${({ theme }) => theme.color.text2};
  height: 1px;
  width: 100%;
  margin-bottom: 8px;
`;
