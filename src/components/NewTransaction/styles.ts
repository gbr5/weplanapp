import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface IAmountProps {
  isOverdue: boolean;
  isPaid: boolean;
}

export const Container = styled.View`
  width: 100%;
  padding: 0px;
  flex-direction: row;
  margin: 8px 0 0;
`;

export const TextContainer = styled.View`
  width: 86%;
  align-items: center;
  flex-direction: row;
`;

export const Index = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.primary};
  font-size: ${RFValue(16)}px;
  margin-right: 8px;
`;

export const AmountButton = styled.TouchableOpacity`
  align-items: flex-end;
  justify-content: center;
  width: 63%;
  margin-right: 8px;
  background-color: ${({ theme }) => theme.color.text6};
  padding: 5px;
  border-radius: 4px;
`;
export const DateButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text6};
  padding: 6.7px;
  border-radius: 4px;
`;

export const Amount = styled.Text<IAmountProps>`
  text-align: right;
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

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${RFValue(16)}px;
  letter-spacing: 1px;
  text-align: right;
`;

export const IsPaidButton = styled.TouchableOpacity<IAmountProps>`
  background-color: ${({ theme }) => theme.color.text6};
  ${({ theme, isOverdue }) => isOverdue && css`
    background-color: ${theme.color.atention};
  `};
  ${({ theme, isPaid }) => isPaid && css`
    background-color: ${theme.color.success_light};
  `};
  padding: 2px 2px 3px 3px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.text1};
  margin: 4px 12px 4px;
`;

export const IsPaidIcon = styled(Feather)<IAmountProps>`
  color: ${({ theme }) => theme.color.text1};
  /* ${({ theme, isOverdue }) => isOverdue && css`
    color: ${theme.color.text6};
  `}
  ${({ theme, isPaid }) => isPaid && css`
    color: ${theme.color.success};
  `} */
  font-size: ${RFValue(20)}px;
  ${({ isPaid }) => !isPaid && css`
    padding: 1px 1px 0 0;
  `};
`;

export const Underline = styled.View`
  width: 100%;
  height: 1.1px;
  background-color: ${({ theme }) => theme.color.secondary};
  margin: 8px 0;
`;
