import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import IFriendDTO from '../../../dtos/IFriendDTO';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin: 40px 0 0;
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

export const FriendButton = styled.TouchableOpacity<IProps>`
  border-radius: 5px;
  border: 0.3px solid ${({ theme }) => theme.color.text3};
  background-color: ${({ isSelected, theme }) => isSelected
    ? theme.color.primary
    : theme.color.text6
  };
  flex-direction: row;
  align-items: center;
  padding: 8px;
  margin-top: 4px;
`;

const imageSize = 40;

export const Avatar = styled.Image`
  border-radius: ${imageSize / 2}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
  margin-right: 8px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(14)}px;
  flex: 1;
  text-align: left;
`;
