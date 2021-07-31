import styled, { css } from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import IPriorityButtonDTO from '../../../../../dtos/IPriorityButtonDTO';

const iconSize = 22;
const iconButtonMargin = '6px';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: 8px;
  flex-direction: row;
`;

export const DateTime = styled.Text`
  color: ${({ theme }) => theme.color.text6};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  letter-spacing: 1px;
`;

export const PriorityButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.title};
  font-size: ${RFValue(iconSize)}px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 16px;
  padding: 2px;
`;

export const PriorityButton = styled(BorderlessButton)<IPriorityButtonDTO>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  width: 124px;
  border: 1px solid ${({ theme}) => theme.color.title};
  border-radius: 5px;
  margin: ${iconButtonMargin} 0;
  ${({ priority }) => priority === 'high'
    && css`
      background-color: ${({ theme }) => theme.color.atention};
    `};
  ${({ priority }) => priority === 'neutral'
    && css`
      background-color: ${({ theme }) => theme.color.info};
      `};
  ${({ priority }) => priority === 'low'
    && css`
      background-color: ${({ theme }) => theme.color.success};
    `};
`;

export const Legend = styled.Text`
  color: ${({ theme }) => theme.color.text6};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  letter-spacing: 1px;
`;
