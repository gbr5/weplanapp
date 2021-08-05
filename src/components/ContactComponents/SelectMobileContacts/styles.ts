import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Contact } from 'react-native-contacts';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 48px;
`;

export const NumberOfContacts = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
`;

export const ContactContainer = styled(
  FlatList as new () => FlatList<Contact>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  width: 100%;
  padding: 8px 4px;
  flex: 1;
  min-height: 400px;
`;

export const InputContainer = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: ${({ theme }) => theme.color.text6};
  border: 1px solid ${({ theme }) => theme.color.text4};
  border-radius: 16px;
  padding: 8px 16px;
  z-index: 3;
`;

export const Input = styled.TextInput`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  flex: 1;
`;

export const CloseButton = styled(BorderlessButton)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  padding: 2px;
`;

export const SearchButton = styled(BorderlessButton)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

export const CloseIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.atention};
`;
