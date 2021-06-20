import styled from 'styled-components/native';
import theme from '../../../../global/styles/theme';

export const Container = styled.View`
  width: 100%;
  height: 64px;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: 24px;
  color: ${theme.color.text6};
  font-family: ${theme.fonts.roboto_medium};
  margin-right: 12px;
`;
