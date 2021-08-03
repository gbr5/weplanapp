import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(BorderlessButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${({ theme }) => theme.color.atention};
  border-radius: 16px;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  z-index: 6;
  transform: rotateZ(45deg);
`;
