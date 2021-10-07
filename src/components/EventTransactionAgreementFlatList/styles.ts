import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import IEventTransactionAgreementDTO from '../../dtos/IEventTransactionAgreementDTO';

export const Container = styled(
  FlatList as new () => FlatList<IEventTransactionAgreementDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  width: 100%;
  max-height: 100%;
  flex: 1;
  margin-top: 8px;
  background-color: #f3f2f2;
  border-radius: 8px;
  border: 0.4px solid #e1e0e0;
`;
