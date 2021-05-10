import styled, { css } from 'styled-components/native';
import { theme } from '../../global';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${theme.TextColor4};
  margin: 8px auto;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${theme.TextColor2};

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid ${theme.PrimaryColor};
      background: ${theme.BackgroundColor};
    `}
  ${props =>
    props.isErrored &&
    css`
      border: 2px solid ${theme.ErrorColor};
      background: ${theme.ErrorBackgroundColor};
    `}
`;

export const TextInput = styled.TextInput<ContainerProps>`
  flex: 1;
  color: ${theme.TextColor1};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;

  ${props =>
    props.isFocused &&
    css`
      color: ${theme.TextColor1};
    `}
`;

interface IconProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Icon = styled(FeatherIcon)<IconProps>`
  margin-right: 16px;
  color: ${theme.SecondaryColor};
  padding: 4px;
  border-radius: 4px;
  ${props =>
    props.isFocused &&
    css`
      color: ${theme.PrimaryColor};
      background: ${theme.SecondaryColor};
    `}
  ${props =>
    props.isFilled &&
    css`
      color: ${theme.PrimaryColor};
      background: ${theme.SecondaryColor};
    `}
`;
