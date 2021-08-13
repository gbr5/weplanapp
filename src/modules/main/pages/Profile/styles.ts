import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 32px 16px ${Platform.OS === 'ios' ? 40 : 10}px;
  background-color: ${({ theme }) => theme.color.text5};
`;

export const Body = styled.ScrollView`
  width: 100%;
  padding: 0 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
  flex: 1;
  padding: 0 16px;
  width: 100%;
  margin-top: 16px;
`;

const imageSize = 220;

export const Avatar = styled.Image`
  border-radius: ${imageSize / 2}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
`;

export const AvatarButton = styled.TouchableOpacity`
  border-radius: ${imageSize / 2}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
  border: 0.5px solid ${({ theme }) => theme.color.text4};
  margin: 32px 0;
`;

export const FieldButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.text6};
  padding: 8px 8px 0;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.color.text4};
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  min-height: 64px;
  width: 100%;
`;

export const Label = styled.Text`
  position: absolute;
  top: 4px;
  left: 8px;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
