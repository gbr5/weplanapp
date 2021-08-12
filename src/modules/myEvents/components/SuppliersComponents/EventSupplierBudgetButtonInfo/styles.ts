import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 24px 16px 8px 16px;
  border-radius: 5px;
  border: 0.5px solid ${({ theme }) => theme.color.text4};
  background-color: ${({ theme }) => theme.color.text6};
  top: -8px;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.text6};
  padding: 8px 8px 0;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.color.text4};
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  min-height: 56px;
  width: 100%;
`;

export const Label = styled.Text`
  position: absolute;
  top: 4px;
  left: 8px;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
  flex: 1;
  padding: 0 16px;
  width: 100%;
  margin-top: 12px;
`;

export const DueDate = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.secondary};
  text-align: center;
`;
