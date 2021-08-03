import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  margin-top: 40px;
  width: 100%;
`;

export const Option = styled(BorderlessButton)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1% 0 3%;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const Text = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const CancelOption = styled(BorderlessButton)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1% 0 3%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.atention};
`;

export const CancelIcon = styled(Feather)`
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.color.atention};
`;

export const CancelText = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const Body = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateContainer = styled.View`
`;

export const DateTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  margin: 0 0 5%;
`;

export const DateButton = styled(BorderlessButton)`
  border-radius: 8px;
  padding: 8px;
  min-width: 45%;
  background-color: ${({ theme }) => theme.color.text6};
  border: 1px solid black;
  align-items: center;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

