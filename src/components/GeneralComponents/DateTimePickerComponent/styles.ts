import styled from 'styled-components/native';
import { theme } from '../../../global';

export const Container = styled.View`
  /* position: absolute; */
  /* z-index: 15; */
  /* top: 5%;
  left: 5%; */
  width: 90%;
  height: 90%;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: ${theme.TextColor1};
  margin: 0 24px 24px;
`;
