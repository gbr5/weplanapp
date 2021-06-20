import styled from 'styled-components/native';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  position: absolute;
  z-index: 5;
  background-color: ${theme.color.text5};
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  padding: 0 16px;
  flex: 1;
`;
