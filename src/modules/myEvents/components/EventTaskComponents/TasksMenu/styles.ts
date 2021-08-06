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

export const MenuButton = styled.TouchableOpacity<IButtonProps>`
  height: ${({ isActive }) => (isActive ? `${RFValue(56)}px` : `${RFValue(56)}px`)};
  background-color: ${({ theme }) => theme.color.text6};
  ${({ isActive }) => !isActive && css`
    border: 0.5px solid ${({ theme }) => theme.color.text3};
  `};
  align-items: center;
  ${({ stage, isActive }) => stage === 'not started' && isActive && css`
    background-color: ${({ theme }) => theme.color.info};
    border: 0.5px solid ${({ theme }) => theme.color.info};
  `}
  ${({ stage, isActive }) => stage === 'running' && isActive && css`
    background-color: ${({ theme }) => theme.color.atention};
    border: 0.5px solid ${({ theme }) => theme.color.atention};
  `}
  ${({ stage, isActive }) => stage === 'finnished' && isActive && css`
    background-color: ${({ theme }) => theme.color.success};
    border: 0.5px solid ${({ theme }) => theme.color.success};
  `}
  justify-content: center;
  width: 30%;
  border-radius: 16px;
`;

export const MenuButtonText = styled.Text<IButtonProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme, isActive }) => (isActive ? theme.color.text6 : theme.color.text1)};
`;

export const MenuButtonIcon = styled(Feather)<IButtonProps>`
  color: ${({ theme, isActive }) => (isActive ? theme.color.primary : theme.color.text1)};
`;
