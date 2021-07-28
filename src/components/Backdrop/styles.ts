import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';


interface IProps {
  zIndex: number;
}

export const Container = styled(BorderlessButton)<IProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
  flex: 1;
  z-index: ${({ zIndex }) => zIndex ? zIndex : 2};
  background-color: rgba(0,0,0,0.5);
`;
