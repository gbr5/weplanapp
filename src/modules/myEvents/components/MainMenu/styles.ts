import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
  isActive: boolean;
}

const menuButtonSize = RFValue(146);
const heightProportion = 0.55;

export const Container = styled.ScrollView`
  margin: 4px 0 0;
  height: ${(menuButtonSize * heightProportion)}px;
  border: 1px solid ${({ theme }) => theme.color.text6};
`;

export const MenuButton = styled.TouchableOpacity<IProps>`
  margin: 0 8px;
  height: ${menuButtonSize * heightProportion}px;
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
  margin-top: 16px;
`;
