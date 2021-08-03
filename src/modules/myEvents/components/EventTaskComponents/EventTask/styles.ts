import styled from 'styled-components/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled(BorderlessButton)<IButtonProps>`
  width: 100%;
  padding: 8px;
  background-color: ${({ theme, isActive }) => isActive ? theme.color.text4 : theme.color.text6};
  border-radius: 5px;
  margin-top: 8px;
  border: 1px solid ${({ theme }) => theme.color.text3};
`;

export const CloseButton = styled(RectButton)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  padding: 4px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const CloseButtonTitle = styled.Text`
  color: ${({ theme }) => theme.color.atention};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
`;
