import styled, { css } from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import IPriorityButton from '../../../../../dtos/IPriorityButtonDTO';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-bottom: 24px;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const IconButton = styled(BorderlessButton)<IButtonProps>`
  background-color: ${({ theme }) => theme.color.text6};
  padding: 4px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  ${({ isActive }) => isActive && css`
    background-color: ${({ theme }) => theme.color.primary};
  `};
`;

export const Icon = styled(Feather)<IPriorityButton>`
  ${({ priority }) => priority === 'high'
    && css`
      color: ${({ theme }) => theme.color.atention};
    `};
  ${({ priority }) => priority === 'neutral'
    && css`
      color: ${({ theme }) => theme.color.info};
      `};
  ${({ priority }) => priority === 'low'
    && css`
      color: ${({ theme }) => theme.color.success};
    `};
  font-size: ${RFValue(40)}px;
`;
