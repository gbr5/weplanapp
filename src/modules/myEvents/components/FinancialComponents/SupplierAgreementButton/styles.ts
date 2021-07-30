import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface IsOverdueProps {
  isOverdue: boolean;
}

export const Container = styled(BorderlessButton)`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.color.secondary};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  margin: 8px 0;
`;

export const Index = styled.Text`
  color: ${({ theme }) => theme.color.text5};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(15)}px;
  width: 5%;
`;

export const Body = styled.View`
  min-width: 70%;
`;

export const ContractInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

export const SupplierName = styled.Text`
  color: ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.fonts.roboto};
  letter-spacing: 1px;
  font-size: ${RFValue(20)}px;
  text-align: left;
`;

export const Amount = styled.Text`
  min-width: 60%;
  color: ${({ theme }) => theme.color.text6};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(20)}px;
  text-align: right;
`;

export const NumberOfInstallments = styled.Text`
  color: ${({ theme }) => theme.color.text5};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
`;

export const IconContainer = styled(BorderlessButton)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 20%;
`;

export const Status = styled(Feather)<IsOverdueProps>`
  color: ${({ theme, isOverdue }) => isOverdue ? theme.color.atention : theme.color.success};
  font-size: ${RFValue(20)}px;
`;

export const PlusIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
`;

export const PlusContainer = styled.View`
  background-color: ${({ theme }) => theme.color.primary};
  border: 1.2px solid ${({ theme }) => theme.color.text5};
  padding: 4px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const StatusContainer = styled.View<IsOverdueProps>`
  background-color: ${({ theme, isOverdue }) => isOverdue ? theme.color.atention_light : theme.color.success_light};
  border: 1.2px solid ${({ theme }) => theme.color.text5};
  padding: 4px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;
