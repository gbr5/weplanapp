import styled from 'styled-components/native';
import theme from '../../../../global/styles/theme';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  height: 100%;
  margin-bottom: 32px;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.roboto_medium};
  font-size: 24px;
  color: ${theme.color.text1};
`;

export const FormQuestion = styled.Text`
  font-family: ${theme.fonts.roboto_medium};
  font-size: 20px;
  color: ${theme.color.secondary};
`;
