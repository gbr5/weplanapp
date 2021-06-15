import styled from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 120px;
  align-items: center;
  justify-content: center;
`;

export const DashboardButton = styled.TouchableOpacity`
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

export const EventName = styled.Text`
  font-family: ${theme.FontRobotoMedium};
  color: ${theme.PrimaryColor};
  font-size: 32px;
`;

export const Body = styled.ScrollView`
  flex: 1;
  background-color: ${theme.TextColor4};
`;
