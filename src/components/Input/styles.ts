import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${({ theme }) => theme.color.text6};
  margin: 8px auto;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.color.text2};

  ${(props) => props.isFocused
    && css`
      border: 2px solid ${({ theme }) => theme.color.primary};
      /* background: ${({ theme }) => theme.color.text5}; */
    `}
  ${(props) => props.isErrored
    && css`
      border: 2px solid ${({ theme }) => theme.color.atention};
      background: ${({ theme }) => theme.color.atention_light};
    `}
`;

export const TextInput = styled.TextInput<ContainerProps>`
  flex: 1;
  color: ${({ theme }) => theme.color.text1};
  font-family: 'RobotoSlab-Regular';
  font-size: ${RFValue(16)}px;
  background: ${({ theme }) => theme.color.text6};

  ${(props) => props.isFocused
    && css`
      color: ${({ theme }) => theme.color.text1};
      /* background: ${({ theme }) => theme.color.text5}; */
    `}
  ${(props) => props.isErrored
    && css`
      background: ${({ theme }) => theme.color.atention_light};
    `}
`;

interface IconProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Icon = styled(FeatherIcon)<IconProps>`
  margin-right: 16px;
  color: ${({ theme }) => theme.color.secondary};
  padding: 4px;
  border-radius: 4px;
  ${(props) => props.isFocused
    && css`
      color: ${({ theme }) => theme.color.primary};
      background: ${({ theme }) => theme.color.secondary};
    `}
  ${(props) => props.isFilled
    && css`
      color: ${({ theme }) => theme.color.primary};
      background: ${({ theme }) => theme.color.secondary};
    `}
`;
