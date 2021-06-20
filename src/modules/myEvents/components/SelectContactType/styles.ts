import styled, { css } from 'styled-components/native';
import theme from '../../../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.roboto_medium};
  font-size: 24px;
  margin: 16px 0;
`;

interface IProps {
  isActive: boolean;
}

export const ContactTypeButton = styled.TouchableOpacity<IProps>`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  background-color: ${theme.color.secondary};
  margin: 16px 0;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 32px;

  ${(props) => props.isActive
    && css`
      background-color: ${theme.color.primary};
    `}
`;

export const ContactTypeText = styled.Text<IProps>`
  font-family: ${theme.fonts.roboto};
  color: ${theme.color.primary};
  font-size: 20px;

  ${(props) => props.isActive
    && css`
      color: ${theme.color.text1};
      font-family: ${theme.fonts.roboto_medium};
    `}
`;

export const IconContainer = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid ${theme.color.text1};
  align-items: center;
  justify-content: center;
`;
