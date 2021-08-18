import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  height: 80px;
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

export const CloseButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  padding: 2px;
`;

export const SearchButton = styled.TouchableOpacity`
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
