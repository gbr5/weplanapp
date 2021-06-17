import styled, { css } from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  flex: 1;
  paddingVertical: 8px;
  paddingHorizontal: 16px;
`;

export const GuestMainMenu = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

interface IButtonProps {
  active: boolean;
}

export const GuestMainMenuButton = styled.TouchableOpacity<IButtonProps>`
  width: 45%;
  height: 40px;
  background-color: ${theme.SecondaryColor};
  border-radius: 8px;
  align-items: center;
  justify-content: center;

  ${(props) => props.active
    && css`
      background-color: ${theme.PrimaryColor};
    `}
`;

export const GuestMainMenuButtonText = styled.Text<IButtonProps>`
  font-family: ${theme.FontRobotoMedium};
  font-size: 24px;
  color: ${theme.PrimaryColor};


  ${(props) => props.active
    && css`
      color: ${theme.TextColor1};
    `}
`;

export const AddGuestButton = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  marginVertical: 16px;
  border-radius: 8px;
  border: 1px solid ${theme.TextColor2};
  background-color: ${theme.TextColor5};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AddGuestButtonText = styled.Text`
  font-family: ${theme.FontRobotoRegular};
  font-size: 20px;
  text-align: center;
  margin-right: 8px;
`;

export const AddGuestIcon = styled.View`
  margin-left: 8px;
`;

export const GuestsContainer = styled.ScrollView`
  flex: 1;
  max-height: 600px;
  marginVertical: 8px;
`;
