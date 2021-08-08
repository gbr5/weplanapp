import styled from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';

export const Container = styled.View`
  flex: 1;
  padding-bottom: ${Platform.OS === 'android' ? '56px' : `${getBottomSpace() + 8}px`};
`;

export const SuppliersContainer = styled(
  FlatList as new () => FlatList<IEventSupplierDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 80,
  },
})`
  margin-top: 4px;
  border-radius: 8px;
  width: 100%;
  padding: 2px;
  margin-bottom: 32px;
`;
