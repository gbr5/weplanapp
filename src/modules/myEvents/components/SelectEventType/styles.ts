import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 16px;
`;

export const EventTypeButton = styled.TouchableOpacity<IButtonProps>`
  border-radius: 5px;
  background-color: ${({ theme, isActive }) => (isActive
    ? theme.color.secondary
    : theme.color.primary)
};
  padding: 16px;
  margin-top: 16px;
  align-items: center;
`;

export const EventTypeButtonText = styled.Text<IButtonProps>`
  color: ${({ theme, isActive }) => (isActive
    ? theme.color.text6
    : theme.color.text1)
};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
