import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import IEventGuestDTO from '../../../../dtos/IEventGuestDTO';

export const Container = styled(
  FlatList as new () => FlatList<IEventGuestDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  margin-top: 4px;
  border-radius: 8px;
  width: 100%;
  height: 208px;
`;
