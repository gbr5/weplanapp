import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ISubCategoryProps {
  isActive: boolean;
}

export const Container = styled.View`
  margin: 40px 0;
  flex: 1;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(24)}px;
  margin: 16px 0;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

export const SubCategoryButton = styled.TouchableOpacity<ISubCategoryProps>`
  background-color: ${({ theme }) => theme.color.primary};
  ${({ isActive }) => isActive && css`
    background-color: ${({ theme }) => theme.color.secondary};
  `};
  border-radius: 5px;
  margin: 8px 0;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;


export const SubCategoryButtonText = styled.Text<ISubCategoryProps>`
  color: ${({ theme }) => theme.color.text1};
  ${({ isActive }) => isActive && css`
    color: ${({ theme }) => theme.color.primary};
  `};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const GoBackButton = styled.TouchableOpacity`
  padding: 16px;
  margin: 16px 0;
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const GoBackButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.primary};
  font-size: ${RFValue(24)}px;
`;
