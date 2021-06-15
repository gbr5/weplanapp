import styled from 'styled-components/native';
import Icons from 'react-native-vector-icons/Feather';
import { theme } from '../../../../global';

export const Container = styled.View`
  flex-direction: column;
  background-color: ${theme.TextColor3}
  width: 90%;
  height: 88%;
  border-radius: 16px;
  padding: 8px;
  margin: 16px;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: 24px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
  margin-right: 12px;
`;

export const EventName = styled.Text`
  padding: 5px;
  font-size: 24px;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Medium';
  margin-right: 12px;
`;
