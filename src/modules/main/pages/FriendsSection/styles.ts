import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding:
    ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 0}px
    0
    ${Platform.OS === 'ios' ? 40 : 0}px;
  align-items: center;
  background-color: ${({ theme }) => theme.color.text5};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};

`;
