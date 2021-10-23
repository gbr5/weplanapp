import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(28)}px;
  color: ${({ theme }) => theme.color.text6};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const ProfileButton = styled.TouchableOpacity`

`;
export const UserAvatar = styled.Image`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: 8px;
  margin-right: 16px;
`;

export const Logo = styled.Image`
  height: ${RFValue(40)}px;
  margin: 18px 64px;
`;
