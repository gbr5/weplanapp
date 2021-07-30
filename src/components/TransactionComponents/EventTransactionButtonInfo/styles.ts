import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

interface IsPaidParams {
  color: string;
}

export const Container = styled.View`
  width: 100%;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.text4};
  border-radius: 8px;
`;

export const FieldContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  min-height: 48px;
`;

export const FieldText = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const FieldButtonText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const FieldButton = styled(BorderlessButton)`
  background-color: ${({ theme }) => theme.color.text6};
  padding: 12px;
  border-radius: 8px;
  border: 1.2px solid black;
  align-items: center;
  justify-content: center;
  min-width: 48%;
`;

export const PaidButton = styled(BorderlessButton)<IsPaidParams>`
  background-color: ${({ color }) => color};
  min-width: 36%;
  padding: 8px;
  border-radius: 8px;
  border: 1.2px solid black;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
  min-height: 60px;
`;

export const PaidIcon = styled(Feather)`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const DeleteButton = styled(BorderlessButton)`
  background-color: ${({ theme }) => theme.color.atention_light};
  padding: 8px;
  border-radius: 8px;
  border: 1.2px solid black;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  min-width: 60px;
`;

export const DeleteIcon = styled(Feather)`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.color.atention};
`;

export const ReceiptButton = styled(BorderlessButton)`
  background-color: ${({ theme }) => theme.color.info_light};
  padding: 8px;
  border-radius: 8px;
  border: 1.2px solid black;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  min-width: 60px;
`;

export const ReceiptIcon = styled(Feather)`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.color.info};
`;
