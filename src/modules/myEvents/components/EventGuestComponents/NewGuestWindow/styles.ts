import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  height: 100%;
  width: 100%;
  margin: 40px 0;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.text6};
  padding: 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 8px 0;
`;

export const ButtonTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
`;
