import styled from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  width: 100%;
  height: 64px;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: 24px;
  color: ${theme.TextColor5};
  font-family: 'RobotoSlab-Medium';
  margin-right: 12px;
`;
