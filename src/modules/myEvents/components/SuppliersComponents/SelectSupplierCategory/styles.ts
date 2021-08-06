import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ICategoryProps {
  isActive: boolean;
}

export const Container = styled.ScrollView`
  margin: 40px 0;
  flex: 1;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

export const CategoryButton = styled.TouchableOpacity<ICategoryProps>`
  background-color: ${({ theme }) => theme.color.primary};
  ${({ isActive }) => isActive && css`
    background-color: ${({ theme }) => theme.color.secondary};
  `};
  border-radius: 5px;
  margin: 16px 0;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export const CategoryButtonText = styled.Text<ICategoryProps>`
  color: ${({ theme }) => theme.color.text1};
  ${({ isActive }) => isActive && css`
    color: ${({ theme }) => theme.color.primary};
  `};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;
