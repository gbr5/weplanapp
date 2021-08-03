import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IMenuButtonProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const MenuContainer = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MenuButton = styled(RectButton)<IMenuButtonProps>`
  width: 47%;
  padding: 8px;
  border-radius: 5px;
  background-color: ${({ theme, isActive }) => isActive ? theme.color.primary : theme.color.secondary};
  align-items: center;
  justify-content: center;
`;

export const MenuTitle = styled.Text<IMenuButtonProps>`
  font-family: ${({ theme, isActive }) => isActive ? theme.fonts.roboto : theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme, isActive }) => isActive ? theme.color.text1 : theme.color.primary};
`;

export const Body = styled.View`
  width: 100%;
  height: 64%;
`;
