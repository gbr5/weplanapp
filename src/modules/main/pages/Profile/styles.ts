import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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

export const GoBackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.text5};
  width: 100%;
  height: 32px
`;
