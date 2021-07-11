import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(BorderlessButton)`
  position: absolute;
  top: 50px;
  right: 16px;
  background-color: rgba(200,200,200,0.1);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding-right: 2px;
`;

export const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 28px
`;
