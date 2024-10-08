import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import IEventSupplierBudgetDTO from '../../../../../dtos/IEventSupplierBudgetDTO';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  padding-top: 64px;
  width: 100%;
`;

export const BudgetContainer = styled(
  FlatList as new () => FlatList<IEventSupplierBudgetDTO>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 64,
  },
})`
  flex: 1;
  max-height: 600px;
  margin: 8px 0;
  padding: 0 4px;
  padding-bottom: 32px;
  border-radius: 8px;
  border: 0.4px solid #e1e0e0;
`;
