import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import IEventMemberDTO from '../../../../../dtos/IEventMemberDTO';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Body = styled.View`
  /* flex: 1; */
  width: 100%;
  height: 64%;
`;

export const MembersContainer = styled(
  FlatList as new () => FlatList<IEventMemberDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  border-radius: 8px;
  width: 100%;
  height: 300px;
`;
