import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import IEventGuestDTO from '../../../../dtos/IEventGuestDTO';

export const Container = styled.View`
  flex: 1;
  padding-bottom: 40px;
`;

export const GuestMainMenu = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

interface IButtonProps {
  active: boolean;
}

export const GuestMainMenuButton = styled.TouchableOpacity<IButtonProps>`
  width: 45%;
  height: 40px;
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 8px;
  align-items: center;
  justify-content: center;

  ${(props) => props.active
    && css`
      background-color: ${({ theme }) => theme.color.primary};
    `}
`;

export const GuestMainMenuButtonText = styled.Text<IButtonProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.primary};


  ${(props) => props.active
    && css`
      color: ${({ theme }) => theme.color.text1};
    `}
`;

export const AddGuestButton = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  margin: 16px 0;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.text2};
  background-color: ${({ theme }) => theme.color.text6};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AddGuestButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(20)}px;
  text-align: center;
  margin-right: 8px;
`;

export const AddGuestIcon = styled.View`
  margin-left: 8px;
`;

export const GuestsContainer = styled(
  FlatList as new () => FlatList<IEventGuestDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 64,
  },
})`
  flex: 1;
  max-height: 600px;
  margin: 8px 0;
`;
