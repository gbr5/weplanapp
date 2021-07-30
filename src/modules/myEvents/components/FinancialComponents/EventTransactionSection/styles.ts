import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import IEventTransactionDTO from '../../../../../dtos/IEventTransactionDTO';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

interface IsActiveProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  min-height: 40%;
`;

export const FilterButton = styled(BorderlessButton)`
  position: absolute;
  top: -6%;
  left: 2%;
  z-index: 3;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.secondary};
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
`;
export const FilterIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${RFValue(28)}px;
`;
export const IsCancelledButton = styled(BorderlessButton)<IsActiveProps>`
  position: absolute;
  top: -9%;
  left: 2%;
  z-index: 3;
  border-radius: 8px;
  background-color: ${({ isActive, theme }) => isActive ? theme.color.secondary : theme.color.primary_light };
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
`;
export const IsCancelledIcon = styled(Feather)<IsActiveProps>`
  color: ${({ isActive, theme }) => isActive ? theme.color.primary_light : theme.color.secondary };
  font-size: ${RFValue(32)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
  padding-bottom: 8px;
`;

export const TransactionContainer = styled(
  FlatList as new () => FlatList<IEventTransactionDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  border-radius: 16px;
  width: 100%;
  flex: 1;
  min-height: 320px;
`;

export const Menu = styled.ScrollView`
  flex-direction: row;
  width: 100%;
`;

export const MenuButton = styled(RectButton)<IsActiveProps>`
  width: 140px;
  height: 40px;
  border-radius: 5px;
  background-color: ${({ isActive, theme }) => isActive ? theme.color.primary : theme.color.secondary };
  padding: 8px;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
`;

export const MenuTitle = styled.Text<IsActiveProps>`
  color: ${({ isActive, theme }) => isActive ? theme.color.text1 : theme.color.primary };
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

