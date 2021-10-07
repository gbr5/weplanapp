import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  min-height: 80px;
  min-width: 280px;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 8px;
  padding: 0 16px;
  margin: 4px 8px;
`;

export const ContainerButton = styled.TouchableOpacity`
  min-height: 80px;
  min-width: 280px;
  max-width: 280px;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 8px;
  padding: 0 16px;
  margin: auto 8px;
`;

export const ContactType = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  background-color: ${({ theme}) => theme.color.text5};
  text-align: center;
  padding: 4px;
  border-radius: 4px;
  letter-spacing: 2px;
`;

export const ContactInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.color.text1};
  letter-spacing: 1px;
  text-align: right;
`;
