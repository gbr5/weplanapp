import styled from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.TouchableOpacity`
  height: 80px;
  justify-content: center;
  background-color: ${theme.SecondaryColor};
  border-radius: 8px;
  paddingHorizontal: 16px;
  marginVertical: 8px;
`;

export const ContactType = styled.Text`
  font-family: ${theme.FontRobotoMedium};
  font-size: 18px;
  color: ${theme.PrimaryColor};
  letter-spacing: 2px;
`;

export const ContactInfo = styled.Text`
  font-family: ${theme.FontRobotoMedium};
  font-size: 24px;
  color: ${theme.TextColor4};
  letter-spacing: 1px;
  text-align: right;
`;
