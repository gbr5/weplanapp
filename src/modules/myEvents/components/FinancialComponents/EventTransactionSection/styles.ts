import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import IEventTransactionDTO from '../../../../../dtos/IEventTransactionDTO';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  min-height: 37%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
  padding-bottom: 8px;
`;

export const TransactionContainer = styled(
  FlatList as new () => FlatList<IEventTransactionDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  border-radius: 16px;
  width: 100%;
  flex: 1;
`;
