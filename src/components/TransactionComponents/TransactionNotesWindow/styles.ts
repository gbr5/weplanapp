import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import INoteDTO from '../../../dtos/INoteDTO';

export const Container = styled.View`
  flex: 1;
  padding-top: 40px;
  width: 100%;
`;

export const NotesContainer = styled(
  FlatList as new () => FlatList<INoteDTO>,
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
  background-color: #f3f2f2;
  border-radius: 8px;
  border: 0.4px solid #e1e0e0;
`;

