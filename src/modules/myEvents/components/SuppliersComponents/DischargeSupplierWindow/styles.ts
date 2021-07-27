import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import ITransactionDTO from '../../../../../dtos/ITransactionDTO';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface IOptionProps {
  isActive: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin: 40px 0 16px;
`;

export const OptionsContainer = styled.View``;

export const OptionButton = styled(RectButton)<IOptionProps>`
  width: 100%;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isActive }) => isActive
    ? theme.color.primary
    : theme.color.secondary
  };
  border-radius: 12px;
  margin: 8px 0;
`;

export const OptionText = styled.Text<IOptionProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(19)}px;
  color: ${({ theme, isActive }) => isActive
    ? theme.color.text1
    : theme.color.text6
  };
`;
export const SupplierContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
`;

export const SupplierTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.secondary};
  margin-top: 8px;
  text-align: center;
`;

export const SupplierTitleUnderline = styled.View`
  width: 100%;
  height: 1.5px;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const SupplierQuestion = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.secondary};
`;

export const SupplierResponse = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text1};
`;
