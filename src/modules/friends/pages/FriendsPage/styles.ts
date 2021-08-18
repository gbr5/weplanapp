import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import IFriendDTO from '../../../../dtos/IFriendDTO';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  padding: 64px 16px 16px;
  background-color: ${({ theme }) => theme.color.text6};
`;

export const SearchContainer = styled.View`
  width: 100%;
  flex-direction: row;
  z-index: 1;
  align-items: center;
  justify-content: center;
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
  min-height: 65%;
`;

export const RequestsButton = styled.TouchableOpacity`
  padding: 2px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.text6};
  border: 0.3px solid ${({ theme }) => theme.color.text3};
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 8px 14px;
`;

export const RequestsIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(24)}px;
`;
