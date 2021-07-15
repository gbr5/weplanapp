import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  margin: 40px 0;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const FormQuestion = styled.Text`
  margin: 16px 0;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.secondary};
`;

export const BooleanField = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 16px 0;
`;

export const BooleanButton = styled(BorderlessButton)`
  color: ${({ theme }) => theme.color.atention};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(30)}px;
`;

export const SupplierCategoryButton = styled(RectButton)`
  padding: 16px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text4};
`;

export const SupplierCategoryButtonText = styled.Text`
  width: 90%;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const BooleanButtonTitle = styled.Text`
  width: 90%;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.secondary};
`;
