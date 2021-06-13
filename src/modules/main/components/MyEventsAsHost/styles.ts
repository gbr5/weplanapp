import styled from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  width: 100%;
  background: ${theme.TextColor3};
  border-radius: 8px;
  padding: 8px;
  marginVertical: 16px;
  min-height: 80px;
`;

export const Label = styled.Text`
  width: 100%;
  color: ${theme.PrimaryColor};
  font-family: ${theme.FontRobotoRegular};
  font-size: 18px;
  padding-left: 8px;
  letter-spacing: 1px;
`;

export const LabelUnderline = styled.View`
  width: 80%;
  height: 1px;
  margin-left: 0;
  background-color: ${theme.TextColor5};
`;

export const EventContainer = styled.ScrollView`
  margin-top: 16px;
  border-radius: 8px;
  width: 100%;
  background: ${theme.TextColor4};
  height: 240px;
`;

export const EventButton = styled.TouchableOpacity`
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${theme.TextColor2};
`;

export const Name = styled.Text`
  color: ${theme.TextColor1};
  font-family: ${theme.FontRobotoMedium};
  font-size: 24px;
  margin: 8px 8px 4px 0;
  letter-spacing: 1px;
`;

export const Date = styled.Text`
  width: 100%;
  color: ${theme.TextColor5};
  font-family: ${theme.FontRobotoRegular};
  font-size: 20px;
  padding: 4px;
  text-align: right;
  letter-spacing: 1px;
`;
