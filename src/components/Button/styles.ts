import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import theme from '../../global/styles/theme';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  margin: 16px auto;
  background: ${theme.color.primary};
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  color: ${theme.color.text1};
  font-family: ${theme.fonts.roboto_medium};
`;
