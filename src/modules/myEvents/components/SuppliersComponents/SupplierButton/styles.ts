import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface ISupplierProps {
  isHired: boolean;
}

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.TouchableOpacity<IButtonProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, isActive }) => isActive ? theme.color.text4 : theme.color.text6};
  border: 0.5px solid ${({ theme }) => theme.color.text3};
  margin-top: 8px;
  border-radius: 8px;
  padding: 8px 0;
  width: 100%;
`;

export const SupplierIndex = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.primary};
  text-align: center;
  width: 40px;
  margin: 0 8px;
`;

export const SupplierName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  text-align: left;
  width: 70%;
  color: ${({ theme }) => theme.color.text1};
`;

export const SupplierConfirmationButton = styled.TouchableOpacity<ISupplierProps>`
  width: 10%;
  color: ${({ theme }) => theme.color.atention};

  ${({ isHired }) => isHired && css`
    color: ${({ theme }) => theme.color.success};
  `};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.color.text1};
`;
