import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

interface IsPaidParams {
  color: string;
}

export const Container = styled.View`
  width: 100%;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.text5};
  border: 0.5px solid ${({ theme }) => theme.color.text3};
`;

export const FieldContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  min-height: 48px;
`;

export const CategoryContainer = styled.View`
  margin: 8px 0;
  width: 100%;
`;

export const FieldText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const FieldButtonText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const FieldLabel = styled.Text`
  position: absolute;
  top: 0;
  left: 8px;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const FieldButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.text6};
  padding: 8px;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.color.secondary};
  align-items: center;
  justify-content: center;
  min-width: 48%;
`;

export const PaidButton = styled.TouchableOpacity<IsPaidParams>`
  background-color: ${({ color }) => color};
  min-width: 36%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;

export const PaidIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const DeleteButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.atention_light};
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
`;

export const DeleteIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.atention};
`;

export const ReceiptButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.info_light};
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
  align-items: center;
  justify-content: center;
`;

export const ReceiptIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
`;
