import styled, { css } from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
  isActive: boolean;
}

export const OverContainer = styled.View`
  width: 100%;
  position: relative;
`;

export const Container = styled.View<IProps>`
  position: relative;
  width: 100%;
  height: 56px;
  margin: 4px auto;
  padding: 8px;
  padding-right: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.text6};
  ${({ isActive }) =>
    isActive &&
    css`
      border: 0.19px solid ${({ theme }) => theme.color.primary};
    `}
  border-radius: 2px;
`;

export const GuestInfoButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: none;
`;
export const Index = styled.Text`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${RFValue(16)}px;
  margin: 0 8px;
`;
export const Name = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  flex: 1;
  flex-direction: row;
  text-align: left;
`;
export const ConfirmGuestButton = styled.TouchableOpacity`
  border: none;
  font-size: ${RFValue(24)}px;
  margin-left: 8px;
`;
export const Icon = styled(Feather)`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
`;
