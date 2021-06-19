import styled, { css } from 'styled-components/native';
import { theme } from '../../../../global';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${theme.FontRobotoMedium};
  font-size: 24px;
  marginVertical: 16px;

`;

interface IProps {
  isActive: boolean;
}

export const ContactTypeButton = styled.TouchableOpacity<IProps>`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  background-color: ${theme.SecondaryColor};
  marginVertical: 16px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  paddingHorizontal: 32px;

  ${(props) => props.isActive
    && css`
      background-color: ${theme.PrimaryColor};
    `}
`;

export const ContactTypeText = styled.Text<IProps>`
  font-family: ${theme.FontRobotoRegular};
  color: ${theme.PrimaryColor}
  font-size: 20px;

  ${(props) => props.isActive
    && css`
      color: ${theme.TextColor1};
      font-family: ${theme.FontRobotoMedium};
      `}
`;

export const IconContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid ${theme.TextColor1};
  align-items: center;
  justify-content: center;
`;
