import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface IsSelected {
  isSelected: boolean;
}

interface IsOverdueProps {
  isOverdue: boolean;
}

export const Container = styled.TouchableOpacity<IsSelected>`
  width: 96%;
  padding: 16px 8px;
  background-color: ${({ theme, isSelected }) => isSelected ? theme.color.primary_light : theme.color.text6};
  align-items: center;

  border-radius: 8px;
  margin: 2%;
`;

export const Index = styled.Text`
  color: ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(15)}px;
  margin-right: 16px;
  /* max-width: 10%; */
`;

export const Body = styled.View`
  width: 90%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContractInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  /* margin-right: 40px; */
`;

export const SupplierName = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  letter-spacing: 1px;
  font-size: ${RFValue(18)}px;
  text-align: left;
`;
export const CreatedDate = styled.Text`
  color: ${({ theme }) => theme.color.text2};
  font-family: ${({ theme }) => theme.fonts.roboto};
  letter-spacing: 1px;
  font-size: ${RFValue(14)}px;
  text-align: left;
`;

export const Amount = styled.Text`
  min-width: 60%;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  text-align: right;
`;

export const NumberOfInstallments = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  text-align: left;
  width: 90%;
`;

export const IconContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 20%;
`;

export const Status = styled(Feather)<IsOverdueProps>`
  color: ${({ theme, isOverdue }) => isOverdue ? theme.color.text6 : theme.color.text6};
  font-size: ${RFValue(20)}px;
`;

export const PlusIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
`;

export const PlusContainer = styled.View`
  background-color: ${({ theme }) => theme.color.primary};
  border: 1px solid ${({ theme }) => theme.color.text5};
  padding: 4px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const StatusContainer = styled.View<IsOverdueProps>`
  position: absolute;
  top: 8px;
  right: 16px;
  background-color: ${({ theme, isOverdue }) => isOverdue ? theme.color.atention : theme.color.success};
  border: 0.2px solid ${({ theme }) => theme.color.text3};
  padding: 4px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;
