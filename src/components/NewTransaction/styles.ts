import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton } from 'react-native-gesture-handler';

interface IAmountProps {
  isOverdue: boolean;
  isPaid: boolean;
}

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  margin: 8px 0 0;
`;
export const ButtonContainer = styled.View`
  flex-direction: row;
`;
export const TextContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const Amount = styled.Text<IAmountProps>`
  width: 50%;
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
`;

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
`;

export const IsPaidButton = styled(BorderlessButton)`
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
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
  color: ${({ theme, isPaid, isOverdue }) => !isPaid && isOverdue ? theme.color.atention : theme.color.text1};
  font-size: ${RFValue(20)}px;
`;
