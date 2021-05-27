import styled from 'styled-components/native';
import { theme } from '../../global';

export const Container = styled.View`
  width: 100%;
  height: 24px;
  justify-content: center;
`;

export const StringDate = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;
