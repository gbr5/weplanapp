import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  z-index: 50;
  top: ${RFPercentage(5)}px;
  left: 0%;
  height: ${RFPercentage(60)}px;
  width: 100%;
  padding: 16px;
  padding-top: ${RFValue(64)}px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.text5};
  border-radius: 16px;
`;

export const Question = styled.Text`
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  text-align: justify;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;
