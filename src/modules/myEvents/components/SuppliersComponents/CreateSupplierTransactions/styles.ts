import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
  margin-top: 48px;
  margin-bottom: 32px;
  width: 100%;
`;

export const Title = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
  margin: 16px 0;
`;

export const Underline = styled.View`
  height: 3px;
  width: 80%;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.color.primary};
  margin: 0 auto 12px;
`;

export const QuestionUnderline = styled.View`
  height: 2px;
  width: 100%;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.color.text2};
  margin: 0 auto 12px;
`;

export const SupplierName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  margin: 8px 0 16px;
`;

export const QuestionContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;
export const DateQuestionContainer = styled.View`
  width: 100%;
  padding: 8px 0;
  margin: 8px 0;
`;

export const Question = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text1};
  margin: 16px 0px 8px;
`;

export const IconButton = styled(BorderlessButton)`
  border-radius: 5px;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.text4};
  align-items: center;
  justify-content: center;
`;

export const SelectButtonWindow = styled(RectButton)`
  border-radius: 5px;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.text4};
  border: 1px solid black;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
`;
