import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IProps {
  isConfirmed: boolean;
    }

export const Container = styled.TouchableOpacity<IProps>`
  width: 100%;
  background-color: ${({ isConfirmed, theme }) => !isConfirmed
    ? theme.color.primary_light
    : theme.color.text6};
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 5px;
  margin: 4px 0;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
`;

export const Title = styled.View``;
