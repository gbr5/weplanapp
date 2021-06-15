import styled from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  height: 100%;
  margin-bottom: 32px;
`;

export const Title = styled.Text`
  font-family: ${theme.FontRobotoMedium};
  font-size: 24px;
  color: ${theme.TextColor1};
`;

export const FormQuestion = styled.Text`
  font-family: ${theme.FontRobotoRegular};
  font-size: 20px;
  color: ${theme.SecondaryColor};
`;
