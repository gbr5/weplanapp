import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { theme } from '../../../../global';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding:
    ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 0}px
    0
    ${Platform.OS === 'ios' ? 40 : 0}px;
`;

export const Title = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: ${theme.TextColor3};
  font-family: 'RobotoSlab-Medium';
  margin: 12px auto 24px;
`;

export const Header = styled.View`
  width: 100%;
  padding: 24px;
  background: ${theme.SecondaryColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Body = styled.View`
  padding: 0 16px;
  width: 100%;
  height: 100%;
  background: ${theme.BackgroundColor};
  justify-content: flex-start;
  align-items: flex-start;
`;
export const HeaderTitle = styled.Text`
  font-size: 20px;
  line-height: 28px;
  color: ${theme.TextColor5};
  font-family: 'RobotoSlab-Regular';
`;
export const UserName = styled.Text`
  font-size: 20px;
  line-height: 28px;
  color: ${theme.PrimaryColor};
  font-family: 'RobotoSlab-Medium';
`;
export const ProfileButton = styled.TouchableOpacity`

`;
export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  width: 100%;
  background: ${theme.PrimaryColor};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
export const OpenDatePickerButtonText = styled.Text`
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;
