import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

interface IconProps {
  isActive: boolean;
  iconSize: number;
}

export const Container = styled.TouchableOpacity`
  padding: 4px;
  border-radius: 5px;
  border: 0.5px solid ${({ theme }) => theme.color.text4};
  background-color: ${({ theme }) => theme.color.text6};
`;

export const Icon = styled(Feather)<IconProps>`
  color: ${({ theme, isActive }) => isActive
    ? theme.color.success : theme.color.atention};
  font-size: ${({ iconSize }) => RFValue(iconSize)}px;
`;
