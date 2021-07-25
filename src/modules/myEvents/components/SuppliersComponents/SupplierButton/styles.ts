import styled, { css } from 'styled-components/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface ISupplierProps {
  isHired: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.color.secondary};
  margin: 16px 0 0;
  border-radius: 8px;
  padding: 16px 0;
  width: 100%;
`;

export const SupplierIndex = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text5};
  text-align: center;
  width: 40px;
  margin: 0 8px;
`;

export const GoToSupplierButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const SupplierName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  text-align: left;
  width: 70%;
  color: ${({ theme }) => theme.color.text6};
`;

export const SupplierConfirmationButton = styled(BorderlessButton)<ISupplierProps>`
  width: 10%;
  color: ${({ theme }) => theme.color.atention};

  ${({ isHired }) => isHired && css`
    color: ${({ theme }) => theme.color.success};
  `};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.color.text5};
`;
