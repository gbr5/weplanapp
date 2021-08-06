import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface ISelectedProps {
  isSelected: boolean;
}

export const Container = styled(BorderlessButton)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 5px;
  width: 100%;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: left;
`;

export const Button = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)<ISelectedProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, isSelected }) => isSelected
    ? theme.color.primary : theme.color.text1};
`;
