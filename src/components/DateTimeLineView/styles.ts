import styled from 'styled-components/native';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  width: 100%;
  height: 40px;
  justify-content: center;
`;

export const StringDate = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: ${theme.color.text1};
  font-family: ${theme.fonts.roboto_medium};
`;
