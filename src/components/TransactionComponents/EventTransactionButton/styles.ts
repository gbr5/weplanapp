import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

interface IAmountProps {
  isOverdue: boolean;
  isPaid: boolean;
}

interface IsContainerProps {
  isCancelled: boolean;
  isSelected: boolean;
}

export const Container = styled(RectButton)<IsContainerProps>`
  width: 100%;
  padding: 8px 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ isCancelled }) => isCancelled && css`
    background-color: ${({ theme }) => theme.color.atention_light};
  `}
  ${({ isSelected }) => isSelected && css`
    background-color: ${({ theme }) => theme.color.secondary_light};
  `}
`;

export const CancelledTransaction = styled.View`
  position: absolute;
  z-index: 5;
  top: 80%;
  left: 2%;
  height: 2px;
  width: 96%;
  background-color: ${({ theme }) => theme.color.atention};
  border-radius: 4px;
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
  font-size: ${RFValue(18)}px;
`;

export const Sign = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(22)}px;
`;

export const Amount = styled.Text<IAmountProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
  ${({ isOverdue, isPaid }) => !isPaid && isOverdue &&
    css`
      color: ${({ theme }) => theme.color.atention};
    `};
  ${({ isPaid }) => isPaid &&
    css`
      color: ${({ theme }) => theme.color.success};
    `};
  text-align: right;
  width: 95%;
`;

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
`;

export const InfoButton = styled(BorderlessButton)`
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 1.2px solid black;
`;

export const InfoIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
`;

export const Underline = styled.View`
  width: 100%;
  height: 1.1px;
  background-color: ${({ theme }) => theme.color.secondary};
`;

export const DayContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  /* background-color: ${({ theme }) => theme.color.text6}; */
  padding: 0 16px;
`;

export const MonthContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.color.primary_light};
  z-index: 3;
  padding: 4px 8px;
  position: absolute;
  top: 0;
  left: 8px;
  border-radius: 8px;
  opacity: 0.8;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
  z-index: 2;
  opacity: 1;
`;
export const Day = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
`;
