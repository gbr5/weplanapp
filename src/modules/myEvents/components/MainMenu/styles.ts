import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../../global/styles/theme';
import Feather from 'react-native-vector-icons/Feather';

interface IProps {
  isActive: boolean;
}

const menuButtonSize = RFValue(140);
const heightProportion = 0.5;

export const Container = styled.ScrollView`
  margin: 4px 0 0;
  padding: 4px 0 0;
  /* height: ${(menuButtonSize * heightProportion)/2}px; */
  border: 1px solid ${({ theme }) => theme.color.text6};
`;

export const MenuButton = styled.TouchableOpacity.attrs({
  shadowColor: theme.color.text2,
  shadowOffset: { width: 2, height: 4},
  shadowOpacity: 0.9,
  shadowRadius: 5,
  elevation: 5,
})<IProps>`
  margin: 0 8px;
  height: ${menuButtonSize * heightProportion}px;
  width: ${menuButtonSize}px;
  /* border-radius: ${menuButtonSize / 5}px; */
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.text6};
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.color.text4};

  ${(props) => props.isActive
    && css`
      background-color: ${({ theme }) => theme.color.primary};
    `}
`;

export const MenuButtonText = styled.Text<IProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${RFValue(18)}px;

  ${(props) => props.isActive
    && css`
      color: ${({ theme }) => theme.color.text1};
    `}
`;

export const MenuButtonNumber = styled.Text<IProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.secondary};
  margin-top: 4px;
  font-size: ${RFValue(20)}px;

  ${(props) => props.isActive
    && css`
      color: ${({ theme }) => theme.color.text1};
    `}
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.color.secondary};
  margin-top: 4px;
  font-size: ${RFValue(20)}px;
`;
