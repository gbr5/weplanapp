import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { theme } from '../../global';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${Platform.OS === 'android' ? 90 : 64}px;
  padding: 24px;
  padding: ${Platform.OS === 'ios' ? 4 : 20}px 0 ${Platform.OS === 'ios' ? 24 : 0}px;
`;
export const HeaderTitle = styled.Text`
  font-size: 20px;
  line-height: 28px;
  color: ${theme.TextColor5};
  font-family: 'RobotoSlab-Regular';
`;
export const ProfileButton = styled.TouchableOpacity`

`;
export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px
`;

export const Logo = styled.Image`
  border-radius: 10px;
  /* box-shadow: 0 0 4px 4px rgba(0,0,0,0.3); */
  height: 40px;
  margin: 18px 0 0;
`;
