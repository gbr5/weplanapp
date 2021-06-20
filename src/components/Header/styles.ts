import styled from 'styled-components/native';
import { Platform } from 'react-native';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${Platform.OS === 'android' ? 90 : 48}px;
  padding: 24px;
  padding: ${Platform.OS === 'ios' ? 0 : 20}px 0 ${Platform.OS === 'ios' ? 20 : 0}px;
`;
export const HeaderTitle = styled.Text`
  font-size: 20px;
  line-height: 28px;
  color: ${theme.color.text6};
  font-family: ${theme.fonts.roboto_medium};
`;
export const ProfileButton = styled.TouchableOpacity`

`;
export const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 28px;
  margin-right: 16px;
`;

export const Logo = styled.Image`
  border-radius: 10px;
  /* box-shadow: 0 0 4px 4px rgba(0,0,0,0.3); */
  height: 40px;
  margin: 18px 64px;
`;
