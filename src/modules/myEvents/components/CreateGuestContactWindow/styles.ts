import styled from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  text-align: center;
  font-family: ${theme.FontRobotoMedium};
  color: ${theme.SecondaryColor};
  font-size: 24px;
`;
