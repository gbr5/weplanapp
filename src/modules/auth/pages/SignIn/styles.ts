import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px ${Platform.OS === 'ios' ? 40 : 120}px;
`;
export const Title = styled.Text`
  width: 100%;
  text-align: center;
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text6};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  margin: 64px auto 24px;
`;

export const Logo = styled.Image`
  border-radius: 10px;
  /* box-shadow: 0 0 4px 4px rgba(0,0,0,0.3); */
`;

export const ForgotPasswordButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  margin: 16px auto 0;
`;

export const ForgotPasswordText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text5};
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

export const CreateAccountButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  background: ${({ theme }) => theme.color.secondary};
  width: 100%;
  border-top-width: 1px;
  border-color: #232129;
`;

export const CreateAccountText = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const Icon = styled(FeatherIcon)`
  color: ${({ theme }) => theme.color.primary};
  margin-right: 16px;
`;
