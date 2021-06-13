import styled from 'styled-components/native';
import { theme } from '../../global';

export const Container = styled.View`
  position: absolute;
  z-index: 50;
  top: 30%;
  left: 2%;
  height: 40%;
  width: 96%;
  padding-top: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.TextColor4};
  border-radius: 16px;
`;

export const Question = styled.Text`
  font-size: 22px;
  color: ${theme.TextColor1};
  font-family: ${theme.FontRobotoMedium};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;
