import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
const iconSize = 32;

export const Container = styled.View`
  position: absolute;
  top: -16px;
  left: -16px;
  border-radius: ${iconSize/2}px;
  height: ${iconSize}px;
  width: ${iconSize}px;
  padding: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.atention};
`;
export const Number = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(iconSize/2)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;
