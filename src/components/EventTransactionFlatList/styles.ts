import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import IEventTransactionDTO from '../../dtos/IEventTransactionDTO';

export const Container = styled(
  FlatList as new () => FlatList<IEventTransactionDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  width: 100%;
  min-height: 90%;
  flex: 1;
  margin-top: 8px;
  background-color: #f3f2f2;
  border-radius: 8px;
  border: 0.4px solid #e1e0e0;
`;
