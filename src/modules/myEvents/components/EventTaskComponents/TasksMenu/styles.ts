import { BorderlessButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface IButtonProps {
  isActive: boolean;
  stage: 'not started' | 'running' | 'finnished';
}

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MenuButton = styled(BorderlessButton)<IButtonProps>`
  height: ${({ isActive }) => (isActive ? `${RFValue(68)}px` : `${RFValue(60)}px`)};
  ${({ isActive }) => !isActive && css`
    border: 1.5px solid ${({ theme }) => theme.color.text4};
  `};
  align-items: center;
  ${({ stage, isActive }) => stage === 'not started' && css`
    background-color: ${({ theme }) => isActive
      ? theme.color.info
      : theme.color.info_light};
  `}
  ${({ stage, isActive }) => stage === 'running' && css`
    background-color: ${({ theme }) => isActive
      ? theme.color.atention
      : theme.color.atention_light};
  `}
  ${({ stage, isActive }) => stage === 'finnished' && css`
    background-color: ${({ theme }) => isActive
      ? theme.color.success
      : theme.color.success_light};
  `}
  justify-content: center;
  width: 30%;
  border-radius: 16px;
`;

export const MenuButtonText = styled.Text<IButtonProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme, isActive }) => (isActive ? theme.color.text6 : theme.color.secondary)};
`;

export const MenuButtonIcon = styled(Feather)<IButtonProps>`
  color: ${({ theme, isActive }) => (isActive ? theme.color.primary : theme.color.secondary)};
`;
