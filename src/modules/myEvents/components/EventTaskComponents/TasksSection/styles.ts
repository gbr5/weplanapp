import styled from 'styled-components/native';
import { FlatList, Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import IEventTaskDTO from '../../../../../dtos/IEventTaskDTO';

export const Container = styled.View`
  position: relative;
  flex: 1;
  padding-bottom: ${Platform.OS === 'android' ? '56px' : `${getBottomSpace() + 8}px`};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: 32px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  text-align: center;
  margin: 8px 0;
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
`;
