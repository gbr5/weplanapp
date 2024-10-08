import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface ISupplierProps {
  isHired: boolean;
}

interface IsLate {
  isLate: boolean;
}

interface IBackgroundColor {
  color: string;
}

 // 1
export const Container = styled.View`
  top: -8px;
  z-index: -1;
  width: 99%;
  background-color: ${({ theme }) => theme.color.text6};
  margin: 0 auto 8px;
  border-radius: 8px;
  padding: 8px;
  border: none;
`;

 // 2
export const SupplierName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
`;

 // 3
export const SupplierLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.secondary};
  position: absolute;
  top: 4px;
  left: 4px;
`;

 // 4
export const FieldContainer = styled.View`
  min-height: 84px;
  width: 100%;
  justify-content: flex-end;
`;

 // 5
export const SupplierNameButton = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.text6};
  border: none;
  margin: 8px;
`;

 // 6
export const SupplierConfirmationButton = styled.TouchableOpacity<ISupplierProps>`
  flex-direction: row;
  border-radius: 8px;
  width: 100%;
  padding: 8px;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.color.text6};
  border: none;
`;

 // 7
export const Icon = styled(Feather)`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.color.text1};
`;

 // 8
export const RowContainer = styled.View`
  width: 100%;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

 // 9
export const RowTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
`;

 // 10
export const DateText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.secondary};
  letter-spacing: 1.5px;
`;

 // 11
export const IconContainer = styled.View<IBackgroundColor>`
  padding: 8px;
  background-color: ${({ color }) => color};
  border-radius: 8px;
  border: none;
`;

 // 12
export const NextTransactionContainer = styled.View`
  padding: 8px;
`;

 // 13
export const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 8px 16px 0;
`;

 // 14
export const TransactionRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

 // 15
export const MenuButtonSection = styled.ScrollView`
  margin: 7px 4px 0;
`;

 // 16
export const MenuButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.text6};
  margin-bottom: 8px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 112px;
  border: none;
  margin-right: 16px;
`;

 // 17
export const SectionTitle = styled.Text`
  margin-bottom: 4px;
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
`;

 // 18
export const TransactionText = styled.Text<IsLate>`
  margin-bottom: 4px;
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme, isLate }) => isLate ? theme.color.atention : theme.color.text1};
  text-align: center;
`;

 // 19
export const MenuText = styled.Text`
  margin-bottom: 12px;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
`;

 // 20
export const SectionBorder = styled.View`
  width: 100%;
  min-height: 1px;
  background-color: ${({ theme }) => theme.color.secondary};
  /* margin: 8px 0; */
`;

 // 21
export const SectionTitleLine = styled.View`
  width: 80%;
  min-height: 1.2px;
  background-color: ${({ theme }) => theme.color.primary};
  /* margin: 8px 0; */
`;
