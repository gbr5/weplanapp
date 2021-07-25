import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  margin: 48px 0 0;
`;

export const TransactionContainer = styled.ScrollView`
  width: 100%;
  height: 40%;
  margin: 0 0 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
  margin: 16px 0 0;
  text-align: center;
`;

export const Underline = styled.View`
  height: 3px;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 2px;
  width: 100%;
  margin: 8px 0 16px;
`;

export const Value = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  margin: 16px 0;
`;

export const SubText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  margin: 8px 0;
  text-align: center;
`;

export const EditText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text6};
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin: 0 0 32px;
`;

export const EndButton = styled(RectButton)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.primary};
  flex-direction: row;
  padding: 8px;
  width: 45%;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled(RectButton)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.atention_light};
  flex-direction: row;
  padding: 8px;
  width: 45%;
  align-items: center;
  justify-content: center;
`;

export const EditButton = styled(RectButton)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.secondary};
  flex-direction: row;
  padding: 16px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const EditIcon = styled(Feather)`
  margin-left: 16px;
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text6};
`;
