import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';
import INoteDTO from '../../../../../dtos/INoteDTO';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  margin: 40px 0;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(20)}px;
  text-align: center;
  margin: 4px 0;
`;

export const TaskTitle = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
`;

export const Underline = styled.View`
  background-color: ${({ theme }) => theme.color.primary};
  height: 4px;
  width: 100%;
  margin: 8px 0;
`;

export const NotesContainer = styled(FlatList as new () => FlatList<INoteDTO>)
.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 80,
  },
})`
  margin-top: 16px;
  border-radius: 8px;
  width: 100%;
`;
