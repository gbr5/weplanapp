import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IProps {
  isFriend: boolean;
  friendshipRequested: boolean;
}

export const Container = styled.TouchableOpacity<IProps>`
  width: 100%;
  background-color: ${({ theme }) => theme.color.text6};
  border: 0.5px solid ${({ friendshipRequested, theme }) => friendshipRequested
    ? theme.color.title
    : theme.color.text3};
  ${({ isFriend }) => isFriend && css`
    border: 0.5px solid ${({ theme }) => theme.color.primary};
  `}
  background-color: ${({ friendshipRequested, theme }) => friendshipRequested
    ? theme.color.text5
    : theme.color.primary};
  ${({ isFriend }) => isFriend && css`
    background-color: ${({ theme }) => theme.color.text6};
  `}
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 5px;
  margin: 4px 0;
  flex-direction: row;
  z-index: 2;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(14)}px;
  flex: 1;
  text-align: left;
`;

export const FriendButtonText = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(12)}px;
`;

const imageSize = 40;

export const Avatar = styled.Image`
  border-radius: ${imageSize / 2}px;
  height: ${imageSize}px;
  width: ${imageSize}px;
  margin-right: 8px;
`;

export const FriendButton = styled.TouchableOpacity<IProps>`
  background-color: ${({ friendshipRequested, theme }) => friendshipRequested
    ? theme.color.primary_light
    : theme.color.text6};
  ${({ isFriend }) => isFriend && css`
    background-color: ${({ theme }) => theme.color.primary};
  `}
  padding: 4px;
  border: 0.3px solid ${({ theme }) => theme.color.text3};
  border-radius: 4px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;
