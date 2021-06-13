import styled from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 120px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  border-radius: 10px;
  height: 64px;
  width: 64%;
  margin-top: 16px;
`;

export const GoBack = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 16px;
  background-color: rgba(200,200,200,0.1);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding-right: 2px;
`;

export const Body = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${theme.TextColor3};
`;

export const SignOutButton = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  background-color: rgba(250,30,0,0.4);
  border-radius: 8px;
  margin: 8px 0;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const MenuOption = styled.TouchableOpacity`
  width: 100%;
  background-color: ${theme.TextColor4};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  margin: 8px 0;
`;

export const ButtonText = styled.Text`
  color: rgba(0, 0, 0, 1);
  margin: 0 16px 0 0;
  font-size: 24px;
`;
