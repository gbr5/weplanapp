import styled, { css } from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { Platform, FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import IEventSupplierDTO from '../../../../../dtos/IEventSupplierDTO';

interface IProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding-bottom: ${Platform.OS === 'android' ? '56px' : `${getBottomSpace() + 8}px`};
`;

export const TitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  text-align: center;
  margin: 8px 0;
`;

export const AddButton = styled(BorderlessButton)`
  position: absolute;
  right: 4px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.primary};
  padding: 4px;
`;

export const AddIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(32)}px;
`;

export const SuppliersMenu = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SuppliersMenuButton = styled(RectButton)<IProps>`
  border-radius: 5px;
  padding: 16px;
  margin: 8px;
  background-color: ${({ theme }) => theme.color.primary};
  align-items: center;
  justify-content: center;

  ${({ isActive }) => isActive && css`
    background-color: ${({ theme }) => theme.color.secondary};
  `};
`;

export const SuppliersMenuText = styled.Text<IProps>`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;

  ${({ isActive }) => isActive && css`
    color: ${({ theme }) => theme.color.primary};
  `};
`;

export const SuppliersContainer = styled(
  FlatList as new () => FlatList<IEventSupplierDTO>,
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
