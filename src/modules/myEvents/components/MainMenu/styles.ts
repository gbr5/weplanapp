import styled, { css } from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.ScrollView`
  marginVertical: 8px;
  height: 152px;
  border: 1px solid ${theme.TextColor5};
`;

interface IProps {
  isActive: boolean;
}

export const MenuButton = styled.TouchableOpacity<IProps>`
  marginHorizontal: 8px;
  height: 150px;
  width: 150px;
  border-radius: 75px;
  background-color: ${theme.SecondaryColor};
  align-items: center;
  justify-content: center;

  ${(props) => props.isActive
    && css`
      background-color: ${theme.PrimaryColor};
    `}
`;

export const MenuButtonText = styled.Text<IProps>`
  font-family: ${theme.FontRobotoMedium};
  color: ${theme.PrimaryColor};
  font-size: 20px;

  ${(props) => props.isActive
    && css`
      color: ${theme.TextColor1};
    `}
`;

export const MenuButtonNumber = styled.Text<IProps>`
  font-family: ${theme.FontRobotoMedium};
  color: ${theme.PrimaryColor};
  font-size: 20px;

  ${(props) => props.isActive
    && css`
      color: ${theme.TextColor1};
    `}
`;
