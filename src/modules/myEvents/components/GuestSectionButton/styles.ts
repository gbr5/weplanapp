import styled, { css } from 'styled-components/native';
import { theme } from '../../../../global';

interface IProps {
  isMine: boolean;
}

export const Container = styled.View<IProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.TextColor3};
  marginVertical: 8px;
  min-height: 48px;
  border-radius: 8px;

  ${(props) => props.isMine
    && css`
      background-color: ${theme.PrimaryColor};
    `}
`;

export const GuestIndex = styled.Text`
  font-family: ${theme.FontRobotoRegular};
  font-size: 20px;
  text-align: center;
  width: 24px;
  marginHorizontal: 8px;
`;

export const GuestName = styled.Text<IProps>`
  font-family: ${theme.FontRobotoMedium};
  font-size: 20px;
  text-align: left;

  color: ${theme.TextColor1};

  ${(props) => props.isMine
    && css`
      color: ${theme.SecondaryColor};
    `}
`;

export const GoToGuestButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 90%;
`;

export const GuestConfirmationButton = styled.TouchableOpacity`
  width: 10%;
`;
