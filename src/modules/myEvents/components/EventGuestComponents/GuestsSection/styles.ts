import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import IEventGuestDTO from '../../../../../dtos/IEventGuestDTO';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface IFilterProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding-bottom: 40px;
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
  padding: 2px;
  padding-bottom: 32px;
`;

export const FilterContainer = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  z-index: 2;
`;

export const InputContainer = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: ${({ theme }) => theme.color.text6};
  border: 1px solid ${({ theme }) => theme.color.text4};
  border-radius: 16px;
  padding: 8px 16px;
  flex: 1;
  z-index: 3;
`;

export const Input = styled.TextInput`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const SearchButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  align-items: center;
  justify-content: center;
`;

export const FilterButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  border: 1px solid ${({ theme }) => theme.color.text4};
  padding: 4px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const CloseIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.atention};
`;

export const FilterIcon = styled(Feather)<IFilterProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, isActive }) => isActive ? theme.color.atention : theme.color.info};
`;
