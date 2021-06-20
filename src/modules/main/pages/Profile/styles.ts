import styled from 'styled-components/native';
import { Platform } from 'react-native';
import theme from '../../../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px ${Platform.OS === 'ios' ? 40 : 120}px;

`;
export const Title = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: ${theme.color.text6};
  font-family: ${theme.fonts.roboto_medium};
  margin: 64px auto 24px;
`;

export const GoBackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  color: ${theme.color.text5};
  width: 100%;
  height: 32px
`;
