import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.TouchableOpacity<IButtonProps>`
  width: 100%;
  padding: 8px;
  background-color: ${({ theme, isActive }) => isActive ? theme.color.text6 : theme.color.text6};
  border-radius: 5px;
  margin-top: 8px;
  border: .5px solid ${({ theme }) => theme.color.text3};
`;

export const CloseButton = styled.TouchableOpacity`
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

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  flex: 1;
  text-align: center;
  letter-spacing: 1px;
  margin-top: 4px;
  line-height: 26px;
  /* min-height: 32px; */
`;

export const Underline = styled.View`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.color.primary};
  margin-top: 8px;
`;
