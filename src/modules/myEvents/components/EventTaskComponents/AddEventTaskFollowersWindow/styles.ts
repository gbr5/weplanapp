import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin: 60px 0;
`;
export const Menu = styled.ScrollView`
  width: 100%;
  margin: 8px 0;
  max-height: 64px;
`;
export const MenuButton = styled.TouchableOpacity<IProps>`
  width: 140px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 60px;
  margin: 0 8px;
  background-color: ${({ theme, isActive }) => isActive ? theme.color.primary : theme.color.text6};
`;

export const Type = styled.Text`
  width: 100%;
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;
export const MenuText = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

export const Underline = styled.View`
  background-color: ${({ theme }) => theme.color.primary};
  height: 1px;
  width: 100%;
  margin: 4px 0 12px;
`;
