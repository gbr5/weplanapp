import styled, { css } from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${theme.FontRobotoMedium};
  font-size: 32px;
  text-align: center;
  color: ${theme.PrimaryColor};
  margin-top: 16px;
`;

export const Body = styled.ScrollView`
  padding: 16px;
  background: ${theme.BackgroundColor};
  flex: 1;
`;

export const GuestName = styled.Text`
  font-family: ${theme.FontRobotoMedium};
  font-size: 24px;
`;

export const InfoLabel = styled.Text`
  font-family: ${theme.FontRobotoRegular};
  font-size: 18px;
  position: absolute;
  color: ${theme.TextColor4};
  top: 0px;
  left: 4px;
`;

export const InfoContainer = styled.TouchableOpacity`
  background-color: ${theme.TextColor3};
  width: 100%;
  flex-direction: row;
  paddingHorizontal: 16px;
  paddingVertical: 8px;
  min-height: 80px;
  marginVertical: 8px;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
`;

interface IButtonProps {
  isConfirmed: boolean;
}

export const ConfirmationButton = styled.TouchableOpacity<IButtonProps>`
  background-color: ${theme.PrimaryColor};
  width: 100%;
  height: 48px;
  marginVertical: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  ${(props) => !props.isConfirmed
    && css`
      background-color: ${theme.SecondaryColor};
    `}
`;

export const ConfirmationButtonText = styled.Text<IButtonProps>`
  font-family: ${theme.FontRobotoMedium};
  font-size: 24px;
  color: ${theme.TextColor1};

  ${(props) => !props.isConfirmed
    && css`
      color: ${theme.TextColor5};
    `}
`;
