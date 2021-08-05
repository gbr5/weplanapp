import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import IEventOwnerDTO from '../../../../../dtos/IEventOwnerDTO';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Body = styled.View`
  /* flex: 1; */
  width: 100%;
  height: 85%;
`;

export const OwnersContainer = styled(
  FlatList as new () => FlatList<IEventOwnerDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  border-radius: 8px;
  width: 100%;
  height: 300px;
  padding: 2px;
`;
