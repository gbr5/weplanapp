import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MenuButton = styled.TouchableOpacity<IButtonProps>`
  border-radius: 5px;
  padding: 8px;
  width: 47%;
  background-color: ${({ theme }) => theme.color.text6};
  border: 1px solid ${({ theme }) => theme.color.text4};
  align-items: center;
  justify-content: center;

  ${({ isActive }) => isActive && css`
    background-color: ${({ theme }) => theme.color.primary};
  `};
`;

export const MenuText = styled.Text<IButtonProps>`
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;

  ${({ isActive }) => isActive && css`
    color: ${({ theme }) => theme.color.text1};
  `};
`;
