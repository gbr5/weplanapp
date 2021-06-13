import styled from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  width: 100%;
  background: ${theme.TextColor2};
  border-radius: 8px;
  padding: 8px;
`;

export const Label = styled.Text`
  width: 100%;
  color: ${theme.PrimaryColor};
  letter-spacing: 1px;
  font-size: 18px;
  padding-left: 8px;
`;

export const LabelUnderline = styled.View`
  width: 50%;
  height: 1px;
  margin-left: 0;
  background-color: ${theme.TextColor5};
`;

export const Name = styled.Text`
  width: 100%;
  color: ${theme.TextColor1};
  font-family: ${theme.FontRobotoMedium};
  font-size: 28px;
  text-align: center;
  margin: 20px 0 12px;
  letter-spacing: 1.5px;
`;

export const Date = styled.Text`
  width: 100%;
  color: ${theme.TextColor5};
  font-family: ${theme.FontRobotoRegular};
  font-size: 22px;
  padding: 8px;
  text-align: right;
  letter-spacing: 1px;
`;
