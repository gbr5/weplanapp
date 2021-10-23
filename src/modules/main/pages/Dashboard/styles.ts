import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding:
    ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 0}px
    0
    ${Platform.OS === 'ios' ? 40 : 0}px;
  background-color: ${({ theme }) => theme.color.secondary};
`;

export const Body = styled.View`
  padding: 0 16px;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.text5};
  justify-content: flex-start;
  align-items: flex-start;
`;
