import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

interface IsPaidProps {
  isPaid: boolean;
}

export const Container = styled.View`
  width: 100%;
  padding: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const IsPaidSection = styled.View`
  width: 100%;
`;

export const IsPaidButton = styled.TouchableOpacity<IsPaidProps>`
  background-color: ${({ theme, isPaid }) => isPaid ? theme.color.success : theme.color.atention};
`;

export const IsPaidIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const DateButton = styled.TouchableOpacity`
  border-radius: 5px;
  padding: 16px;
  width: 100px;
  background-color: ${({ theme }) => theme.color.secondary};
`;

export const DateText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.primary};
`;
