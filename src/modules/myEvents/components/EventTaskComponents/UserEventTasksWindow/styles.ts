import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin: 74px 0;
  max-height: 100%;
  padding: 4px;
`;


export const TasksContainer = styled(
  FlatList as new () => FlatList<IEventTaskDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 80,
  },
})`
  margin-top: 16px;
  border-radius: 8px;
  width: 100%;
  padding: 2px;
  padding-bottom: 32px;
  border-radius: 8px;
  border: 0.4px solid #e1e0e0;
`;
