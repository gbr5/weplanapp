import styled, { css } from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import IStatusButton from '../../../../../dtos/IStatusButtonDTO';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin: 64px 0 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(22)}px;
  text-align: center;
`;

export const Underline = styled.View`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 2px;

  margin: 4px 0 24px;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 20px;
`;

export const IconButton = styled(BorderlessButton)<IButtonProps>`
  background-color: ${({ theme }) => theme.color.text6};
  padding: 18px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color.text1};
  ${({ isActive }) => isActive && css`
    background-color: ${({ theme }) => theme.color.title};
    border: 2px solid ${({ theme }) => theme.color.text1};
  `};
`;

export const Icon = styled(Feather)<IStatusButton>`
  ${({ status }) => status === 'not started'
    && css`
      color: ${({ theme }) => theme.color.info};
    `};
  ${({ status }) => status === 'running'
    && css`
      color: ${({ theme }) => theme.color.atention};
      `};
  ${({ status }) => status === 'finnished'
    && css`
      color: ${({ theme }) => theme.color.success};
    `};
  font-size: ${RFValue(40)}px;
`;
