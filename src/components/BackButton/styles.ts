import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled(BorderlessButton)`
  position: absolute;
  top: 50px;
  left: 16px;
  background-color: rgba(200,200,200,0.1);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding-right: 2px;
`;
