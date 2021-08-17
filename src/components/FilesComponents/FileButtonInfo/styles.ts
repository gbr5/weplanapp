import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const FieldButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.text6};
  padding: 8px;
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.color.secondary};
  align-items: center;
  justify-content: center;
  min-width: 48%;
`;

export const FieldLabel = styled.Text`
  position: absolute;
  top: 0;
  left: 8px;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const Label = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
