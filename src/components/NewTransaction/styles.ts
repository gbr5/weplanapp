import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton } from 'react-native-gesture-handler';

interface IAmountProps {
  isOverdue: boolean;
  isPaid: boolean;
}

export const Index = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
  margin-right: 8px;
`;

export const Container = styled.View`
  width: 100%;
  padding: 0px;
  flex-direction: row;
  margin: 8px 0 0;
`;
export const ButtonContainer = styled.View`
  flex-direction: row;
`;
export const TextContainer = styled.View`
  width: 86%;
  align-items: center;
  flex-direction: row;
`;

export const Amount = styled.Text<IAmountProps>`
  text-align: left;
  width: 65%;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
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
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(16)}px;
  letter-spacing: 1px;
  text-align: right;
`;

export const IsPaidButton = styled(BorderlessButton)<IAmountProps>`
  background-color: ${({ theme }) => theme.color.info_light};
  ${({ theme, isOverdue }) => isOverdue && css`
    background-color: ${theme.color.atention};
  `};
  ${({ theme, isPaid }) => isPaid && css`
    background-color: ${theme.color.success_light};
  `};
  padding: 2px 2px 4px 4px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1.5px solid ${({ theme }) => theme.color.text1};
  margin: 0 12px 4px;
`;

export const DeleteButton = styled(BorderlessButton)`
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.atention_light};
`;

export const EditButton = styled(BorderlessButton)`
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const DeleteIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
`;
export const EditIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.atention};
  font-size: ${RFValue(20)}px;
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
