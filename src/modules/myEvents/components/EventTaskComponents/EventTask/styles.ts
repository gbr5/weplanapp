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
  padding: 16px 8px 8px;
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 5px;
  margin-top: 16px;
`;

export const Body = styled.View`
  width: 100%;
  margin: 16px -8px 32px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateContainer = styled.View`
`;

export const DateTimeContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: 16px;
  flex-direction: row;
`;

export const DateTime = styled.Text`
  color: ${({ theme }) => theme.color.text6};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  letter-spacing: ${letterSpacing};
`;


export const Date = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  letter-spacing: ${letterSpacing};
`;

export const Legend = styled.Text`
  color: ${({ theme }) => theme.color.text6};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
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
  width: 55%;
`;

export const Button = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text6};
  padding: 12.3px;
  border: 1px solid ${({ theme}) => theme.color.title};
  border-radius: 5px;
  margin: ${iconButtonMargin} 0;
`;

export const NoteButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.info_light};
  padding: 10px;
  border: 1px solid ${({ theme}) => theme.color.title};
  border-radius: 5px;
  margin: ${iconButtonMargin} 0;
  flex-direction: row;
`;

export const ArrowIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.title};
  font-size: ${RFValue(24)}px;
  margin: 0 10px 0 8px;
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${iconButtonPadding};
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

export const StatusButton = styled(BorderlessButton)<IStatusButton>`
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 5px;
  margin: ${iconButtonMargin} 0;
  padding: ${iconButtonPadding};
  border: 1px solid ${({ theme}) => theme.color.title};
  flex-direction: row;
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
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.atention};
  padding: ${iconButtonPadding};
  border: 1px solid ${({ theme}) => theme.color.title};
  border-radius: 5px;
  margin: ${iconButtonMargin} 0;
  flex-direction: row;
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
  color: ${({ theme }) => theme.color.title};
  font-size: ${RFValue(iconSize)}px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 16px;
  padding: 2px;
`;

export const PriorityButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.title};
  font-size: ${RFValue(iconSize)}px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 16px;
  padding: 2px;
`;

export const StatusButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.title};
  font-size: ${RFValue(iconSize)}px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 16px;
  padding: 2px;
`;

export const NotesButtonIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(iconSize)}px;
  margin-left: 8px;
  border: 1px solid ${({ theme }) => theme.color.info};
  border-radius: 16px;
  padding: 2px;
`;
