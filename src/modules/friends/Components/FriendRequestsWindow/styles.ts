import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import IFriendDTO from '../../../../dtos/IFriendDTO';

interface IsActive {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 40px;
`;

export const UserButton = styled.TouchableOpacity<IsActive>`
  background-color: ${({ isActive, theme }) => isActive
    ? theme.color.text5 : theme.color.text6};
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  border: 0.5px solid ${({ theme }) => theme.color.text3};
  margin: 4px 0;
  flex-direction: row;
  align-items: center;
`;

const imageSize = 40;

export const Avatar = styled.Image`
  border-radius: ${imageSize / 2}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
  margin-right: 8px;
`;

export const UserButtonText = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

export const UsersContainer = styled(
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
