import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const DashboardButton = styled.TouchableOpacity`
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

export const EventName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.primary};
  font-size: ${RFValue(16)}px;
  max-width: 100%;
`;

export const Body = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.color.text5};
`;

export const BodyContainer = styled.View`
  height: 72%;
  padding: 0 16px;
`;
