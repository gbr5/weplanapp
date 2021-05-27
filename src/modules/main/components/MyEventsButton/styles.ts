import styled from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  width: 100%;
  padding: 5px;
  background-color: ${theme.InfoBackgroundColor};
  border-radius: 8px;
`;

export const NextEvent = styled.View`
  flex-direction: column;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;

export const NextEventName = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;
export const NextEventDate = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;

export const NextEventConfirmed = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;

export const NextEventNotConfirmed = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
`;
