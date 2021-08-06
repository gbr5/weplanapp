import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface IAmountProps {
  isOverdue: boolean;
  isPaid: boolean;
}

interface IsActiveProps {
  isActive: boolean;
}

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextContainer = styled.View`
  width: 87%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Index = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(15)}px;
  margin-right: 2px;
`;

export const Amount = styled.Text<IAmountProps>`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
  ${({ isOverdue, isPaid }) => !isPaid && isOverdue &&
    css`
      color: ${({ theme }) => theme.color.atention};
    `};
  ${({ isPaid }) => isPaid &&
    css`
      color: ${({ theme }) => theme.color.success};
    `};
`;

export const Status = styled.Text<IAmountProps>`
  /* margin: 0 8px; */
  width: 27%;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.info};
  font-size: ${RFValue(15)}px;
  ${({ isOverdue, isPaid }) => !isPaid && isOverdue &&
    css`
      color: ${({ theme }) => theme.color.atention};
    `};
  ${({ isPaid }) => isPaid &&
    css`
      color: ${({ theme }) => theme.color.success};
    `};
`;

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${RFValue(16)}px;
`;

export const InfoButton = styled.TouchableOpacity`
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid black;
`;

export const InfoIcon = styled(Feather)<IsActiveProps>`
  color: ${({ theme, isActive }) => isActive ? theme.color.atention : theme.color.text1};
  font-size: ${RFValue(20)}px;
`;

export const Underline = styled.View`
  width: 100%;
  height: 1.1px;
  background-color: ${({ theme }) => theme.color.secondary};
  margin: 8px 0;
`;
