import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  z-index: 2;
  padding: 8px 16px;
  border-radius: 5px;
  border: 0.5px solid ${({ theme }) => theme.color.text4};
  background-color: ${({ theme }) => theme.color.text6};
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: right;
  flex: 1;
  padding: 0 16px;
`;

export const DueDate = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.secondary};
  text-align: center;
`;

export const Index = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.primary};
  text-align: center;
`;
