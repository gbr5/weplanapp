import styled from 'styled-components/native';
import theme from '../../../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  text-align: center;
  color: ${theme.color.secondary};
  font-family: ${theme.fonts.roboto_medium};
  font-size: 24px;
`;
