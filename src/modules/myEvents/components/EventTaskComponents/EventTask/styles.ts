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

export const PriorityButton = styled(BorderlessButton)<IPriorityButtonDTO>`
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 5px;
  margin: 4px;
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

export const StatusButton = styled(BorderlessButton)<IStatusButton>`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text6};
  padding: 4px;
  border-radius: 5px;
  margin: 4px;
  ${({ status }) => status === 'running'
    && css`
      background-color: ${({ theme }) => theme.color.atention};
    `};
  ${({ status }) => status === 'not started'
    && css`
      background-color: ${({ theme }) => theme.color.info};
      `};
  ${({ status }) => status === 'finnished'
    && css`
      background-color: ${({ theme }) => theme.color.success};
    `};
`;

export const DeleteButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.atention};
  padding: 4px;
  border-radius: 5px;
  margin: 4px;
`;

export const NumberOfNotesContainer = styled.View`
  border-radius: 80px;
  padding: 4px;
  position: absolute;
  background-color: ${({ theme }) => theme.color.atention};
  top: -26px;
  left: -26px;
  min-width: 40px;
  min-height: 40px;
  justify-content: center;
  align-items: center;
`;

export const NumberOfNotes = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(16)}px;
`;

export const DeleteButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text6};
`;

export const PriorityButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
`;

export const StatusButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
`;

export const NotesButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.info};
`;
