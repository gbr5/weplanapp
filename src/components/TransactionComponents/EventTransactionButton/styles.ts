import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface IAmountProps {
  isOverdue: boolean;
  isPaid: boolean;
}

interface IsContainerProps {
  isCancelled: boolean;
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity<IsContainerProps>`
  width: 100%;
  padding: 8px 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* margin: 4px 0; */
  ${({ isCancelled }) => isCancelled && css`
    /* background-color: ${({ theme }) => theme.color.atention_light}; */
    opacity: 0.4;
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

export const MainContainer = styled.View`
  flex: 1;

  /* align-items: center;
  justify-content: center; */
`;
export const TextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
`;

export const Index = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
`;

export const SignUp = styled(Feather)`
  color: ${({ theme }) => theme.color.success};
  font-size: ${RFValue(20)}px;
  margin: 0 4px;
`;

export const Sign = styled(Feather)`
  color: ${({ theme }) => theme.color.atention};
  font-size: ${RFValue(20)}px;
  margin: 0 4px;
`;

export const Amount = styled.Text<IAmountProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(16)}px;
  ${({ isOverdue, isPaid }) => !isPaid && isOverdue &&
    css`
      color: ${({ theme }) => theme.color.atention};
    `};
  ${({ isPaid }) => isPaid &&
    css`
      color: ${({ theme }) => theme.color.success};
    `};
  text-align: right;
  flex: 1;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${RFValue(14)}px;
  text-align: left;
  flex: 1;
  margin-right: 4px;
`;

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
`;

export const InfoButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 16px;
`;

export const InfoIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
`;

export const Underline = styled.View`
  width: 100%;
  height: 0.3px;
  background-color: ${({ theme }) => theme.color.text4};
`;

export const DayContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  /* background-color: ${({ theme }) => theme.color.text6}; */
  padding: 0 16px;
`;

export const YearContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  position: absolute;
  top: 0;
  left: 40%;
`;

export const MonthContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text1};
  border: 0.5px solid ${({ theme }) => theme.color.text4};
  opacity: 0.5;
  z-index: 3;
  letter-spacing: 1px;
  padding: 4px 8px;
  position: absolute;
  top: 0;
  left: 0px;
  border-radius: 8px;
  opacity: 0.8;
  width: 120px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.primary};
  font-size: ${RFValue(14)}px;
  z-index: 2;
  opacity: 1;
`;

export const Day = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(14)}px;
`;

export const Year = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.primary};
  font-size: ${RFValue(16)}px;
`;
