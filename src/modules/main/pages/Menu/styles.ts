import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

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

export const Body = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.color.text3};
`;

export const SignOutButton = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.color.atention};
  border-radius: 8px;
  margin: 8px 0;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const MenuOption = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.color.text5};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  margin: 8px 0;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  margin: 0 16px 0 0;
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(24)}px;
`;
