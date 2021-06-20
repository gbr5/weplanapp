import styled from 'styled-components/native';
import theme from '../../../../global/styles/theme';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${theme.fonts.roboto_medium};
  font-size: 24px;
`;
