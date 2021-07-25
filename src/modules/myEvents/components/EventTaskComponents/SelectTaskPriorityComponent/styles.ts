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
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
  margin-bottom: 24px;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.secondary};
`;

export const IconButton = styled(BorderlessButton)<IButtonProps>`
  background-color: ${({ theme }) => theme.color.text5};
  padding: 6px;
  border-radius: 5px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.text5};
  justify-content: center;
  width: 60px;
  height: 60px;
  ${({ isActive }) => isActive && css`
    background-color: ${({ theme }) => theme.color.title};
    border: 2px solid black;
    padding: 4px;
    width: 64px;
    height: 64px;
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
