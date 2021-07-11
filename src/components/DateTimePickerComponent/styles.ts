import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  /* position: absolute; */
  /* z-index: 15; */
  /* top: 5%;
  left: 5%; */
  width: 90%;
  height: 90%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  margin: 0 24px 24px;
`;
