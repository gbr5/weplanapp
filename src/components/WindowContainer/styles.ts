import styled from 'styled-components/native';
import { theme } from '../../global';

export const Container = styled.View`
  position: absolute;
  z-index: 5;
  background-color: ${theme.TextColor4};
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;
