import styled, { css } from 'styled-components/native';
import theme from '../../../../global/styles/theme';

export const Container = styled.View`
  height: 80%;
  padding-top: 8px;
  padding-bottom: 160px;
  padding: 0 16px;
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
  background-color: ${theme.color.secondary};
  border-radius: 8px;
  align-items: center;
  justify-content: center;

  ${(props) => props.active
    && css`
      background-color: ${theme.color.primary};
    `}
`;

export const GuestMainMenuButtonText = styled.Text<IButtonProps>`
  font-family: ${theme.fonts.roboto_medium};
  font-size: 24px;
  color: ${theme.color.primary};


  ${(props) => props.active
    && css`
      color: ${theme.color.text1};
    `}
`;

export const AddGuestButton = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  margin: 16px 0;
  border-radius: 8px;
  border: 1px solid ${theme.color.text2};
  background-color: ${theme.color.text6};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AddGuestButtonText = styled.Text`
  font-family: ${theme.fonts.roboto};
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
  margin: 8px 0;
`;
