import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  border: 0.3px solid ${({ theme }) => theme.color.text4};
  border-radius: 5px;
  padding-top: 24px;
  top: -20px;
  padding-bottom: 4px;
`;

export const ContactsMenu = styled.ScrollView`
  height: 80px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(14)}px;
  margin-top: 16px;
`;

export const NameContainer = styled.View`
  width: 100%;
  flex-direction: row;
  margin: 16px 0;
  align-items: center;
  justify-content: center;
`;

export const ContactButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
`;

export const ContactIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const Label = styled.Text`
  position: absolute;
  top: -16px;
  left: 8px;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
