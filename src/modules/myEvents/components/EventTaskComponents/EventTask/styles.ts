import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton } from 'react-native-gesture-handler';
import IPriorityButtonDTO from '../../../../../dtos/IPriorityButtonDTO';

interface IStatusButton {
  status: 'not started' | 'running' | 'finnished';
}

const letterSpacing = '1.3px';
const iconButtonPadding = '10px';
const iconButtonMargin = '6px';
const iconSize = 22;

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 5px;
  margin-top: 16px;
`;

export const Body = styled.View`
  width: 100%;
  margin: 16px 0 32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateContainer = styled.View`
`;


export const Date = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  letter-spacing: ${letterSpacing};
`;

export const Time = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  letter-spacing: ${letterSpacing};
`;

export const ButtonMainContainer = styled.View`
  padding: 4px;
  justify-content: space-between;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.secondary};
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text6};
  padding: ${iconButtonPadding};
  border: 1px solid ${({ theme}) => theme.color.title};
  border-radius: 5px;
  margin: ${iconButtonMargin};
`;

export const ArrowIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.title};
  font-size: ${RFValue(24)}px;
`;

export const ArrowButton = styled(BorderlessButton)`
  flex-direction: row;
  position: absolute;
  bottom: 4px;
  left: 5%;
  z-index: 2;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text3};
  padding: 4px 64px;
  width: 100%;
  border: 1px solid ${({ theme}) => theme.color.text6};
  border-radius: 5px;
  margin: 4px auto 0;
`;

export const PriorityButton = styled(BorderlessButton)<IPriorityButtonDTO>`
  align-items: center;
  justify-content: center;
  padding: ${iconButtonPadding};
  border: 1px solid ${({ theme}) => theme.color.title};
  border-radius: 5px;
  margin: ${iconButtonMargin};
  ${({ priority }) => priority === 'high'
    && css`
      background-color: ${({ theme }) => theme.color.atention_light};
    `};
  ${({ priority }) => priority === 'neutral'
    && css`
      background-color: ${({ theme }) => theme.color.info_light};
      `};
  ${({ priority }) => priority === 'low'
    && css`
      background-color: ${({ theme }) => theme.color.success_light};
    `};

`;

export const StatusButton = styled(BorderlessButton)<IStatusButton>`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 5px;
  margin: ${iconButtonMargin};
  padding: ${iconButtonPadding};
  border: 1px solid ${({ theme}) => theme.color.title};

  ${({ status }) => status === 'running'
    && css`
      background-color: ${({ theme }) => theme.color.atention_light};
    `};

  ${({ status }) => status === 'not started'
    && css`
      background-color: ${({ theme }) => theme.color.info_light};
      `};

  ${({ status }) => status === 'finnished'
    && css`
      background-color: ${({ theme }) => theme.color.success_light};
    `};
`;

export const DeleteButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.atention};
  padding: ${iconButtonPadding};
  border: 1px solid ${({ theme}) => theme.color.title};
  border-radius: 5px;
  margin: ${iconButtonMargin};
`;

export const NumberOfNotesContainer = styled.View`
  border-radius: 80px;
  padding: 4px;
  position: absolute;
  background-color: ${({ theme }) => theme.color.atention};
  top: -26px;
  left: -26px;
  min-width: 38px;
  min-height: 38px;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

export const NumberOfNotes = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(16)}px;
`;


export const DeleteButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text6};
  font-size: ${RFValue(iconSize)}px;
`;

export const PriorityButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(iconSize)}px;
`;

export const StatusButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(iconSize)}px;
`;

export const NotesButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(iconSize)}px;
`;
