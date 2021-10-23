import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 104px;
  /* height: ${Platform.OS === 'android' ? 90 : 48}px; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
