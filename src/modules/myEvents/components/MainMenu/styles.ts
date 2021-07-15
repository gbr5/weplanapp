import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
  isActive: boolean;
}

const menuButtonSize = RFValue(130);

export const Container = styled.ScrollView`
  margin: 8px 0;
  height: ${menuButtonSize + 2}px;
  border: 1px solid ${({ theme }) => theme.color.text6};
`;

export const MenuButton = styled.TouchableOpacity<IProps>`
  margin: 0 8px;
  height: ${menuButtonSize}px;
  width: ${menuButtonSize}px;
  border-radius: ${menuButtonSize / 5}px;
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
  font-size: ${RFValue(18)}px;

  ${(props) => props.isActive
    && css`
      color: ${({ theme }) => theme.color.text1};
    `}
`;

export const MenuButtonNumber = styled.Text<IProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text6};
  margin-top: 4px;
  font-size: ${RFValue(24)}px;

  ${(props) => props.isActive
    && css`
      color: ${({ theme }) => theme.color.text1};
    `}
`;

export const BudgetInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text6};
  margin-top: 4px;
  font-size: ${RFValue(17)}px;
`;
