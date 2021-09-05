import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import IFriendDTO from '../../../dtos/IFriendDTO';

export const Container = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  margin-top: 40px;
`;

export const FriendsContainer = styled(
  FlatList as new () => FlatList<IFriendDTO>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  flex: 1;
  width: 100%;
  padding: 8px 4px;
  border: 0.4px solid #e3e3e3;
  min-height: 55%;
`;
