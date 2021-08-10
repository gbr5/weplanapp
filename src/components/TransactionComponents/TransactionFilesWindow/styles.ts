import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import ITransactionFileDTO from '../../../dtos/ITransactionFileDTO';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  padding-top: 40px;
  width: 100%;
`;

export const FileContainer = styled(
  FlatList as new () => FlatList<ITransactionFileDTO>
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
`;

export const Image = styled.Image`
  border-radius: 5px;
  height: 64px;
  width: 64px;
`;
