import styled, { css } from 'styled-components/native';

export const Container = styled.ScrollView`
  margin: 8px 0;
  height: 152px;
  border: 1px solid ${({ theme }) => theme.color.text6};
`;

interface IProps {
  isActive: boolean;
}

export const MenuButton = styled.TouchableOpacity<IProps>`
  margin: 0 8px;
  height: 150px;
  width: 150px;
  border-radius: 75px;
  background-color: ${({ theme }) => theme.color.text2};
  align-items: center;
  justify-content: center;

  ${(props) => props.isActive
    && css`
      background-color: ${({ theme }) => theme.color.primary};
    `}
`;

export const MenuButtonText = styled.Text<IProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.primary};
  font-size: 20px;

  ${(props) => props.isActive
    && css`
      color: ${({ theme }) => theme.color.text1};
    `}
`;

export const MenuButtonNumber = styled.Text<IProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.primary};
  font-size: 20px;

  ${(props) => props.isActive
    && css`
      color: ${({ theme }) => theme.color.text1};
    `}
`;
