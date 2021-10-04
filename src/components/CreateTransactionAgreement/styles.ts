import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const FormContainer = styled.ScrollView`
  width: 100%;
`;

export const KeyboardAvoidingVueContainer = styled.KeyboardAvoidingView`
  width: 100%;
  flex: 1;
  margin-top: 40px;
`;

export const Title = styled.Text`
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
  margin: 16px 0 4px;
`;

export const Underline = styled.View`
  height: 1px;
  width: 100%;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.color.text3};
  margin-bottom: 12px;
`;

export const SupplierContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Participant = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.color.text5};
`;

export const ParticipantButton = styled.TouchableOpacity`
  width: 98%;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 5px;
  padding: 8px;
  margin: 4px;
`;

export const SupplierText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const SupplierName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text1};
  margin: 4px 0 8px;
  text-align: center;
`;

export const Question = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text2};
  margin: 8px 0px 4px;
`;
