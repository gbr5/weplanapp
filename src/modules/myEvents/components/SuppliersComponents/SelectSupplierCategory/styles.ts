import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ICategoryProps {
  isActive: boolean;
}

export const Container = styled.ScrollView`
  margin-top: 40px;
  flex: 1;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

export const CategoryButton = styled.TouchableOpacity<ICategoryProps>`
  background-color: ${({ theme }) => theme.color.text6};
  ${({ isActive }) => isActive && css`
    background-color: ${({ theme }) => theme.color.text6};
  `};
  border: .5px solid ${({ theme }) => theme.color.text4};
  border-radius: 5px;
  margin: 8px;
  padding: 12px;
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
