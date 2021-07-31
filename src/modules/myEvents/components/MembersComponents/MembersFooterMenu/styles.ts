import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.ScrollView`
  width: 100%;
  padding: 0 16px;
`;

export const MenuButton = styled(BorderlessButton)<IButtonProps>`
  flex-direction: row;
  width: 180px;
  height: 56px;
  border-radius: 5px;
  background-color: ${({ theme, isActive }) => isActive
    ? theme.color.primary
    : theme.color.secondary
  };
  margin: 0 8px;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const MenuText = styled.Text<IButtonProps>`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  color:${({ theme, isActive }) => isActive
    ? theme.color.secondary
    : theme.color.text6
  };
  text-align: center;
  line-height: 26px;
`;

export const MenuIcon = styled(Feather)<IButtonProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, isActive }) => isActive
    ? theme.color.text1
    : theme.color.primary
  };
  margin-left: 8px;
`;
