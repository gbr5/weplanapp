import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton } from 'react-native-gesture-handler';
import IPriorityButtonDTO from '../../../../../dtos/IPriorityButtonDTO';

interface IStatusButton {
  status: 'not started' | 'running' | 'finnished';
}

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.color.text4};
  border-radius: 5px;
  margin-top: 8px;
`;

export const Body = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateContainer = styled.View`
  padding: 8px;
`;

export const Date = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
  /* letter-spacing: 1px; */
`;

export const Time = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
  /* letter-spacing: 1px; */
`;

export const ButtonContainer = styled.View`
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text6};
  padding: 4px;
  border-radius: 5px;
  margin: 4px;
`;

export const DeleteButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.atention};
`;

export const PriorityButtonIcon = styled(Feather)<IPriorityButtonDTO>`
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
`;

export const StatusButtonIcon = styled(Feather)<IStatusButton>`
  ${({ status }) => status === 'running'
    && css`
      color: ${({ theme }) => theme.color.atention};
    `};
  ${({ status }) => status === 'not started'
    && css`
      color: ${({ theme }) => theme.color.info};
      `};
  ${({ status }) => status === 'finnished'
    && css`
      color: ${({ theme }) => theme.color.success};
    `};
`;

export const NotesButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.info};
`;
