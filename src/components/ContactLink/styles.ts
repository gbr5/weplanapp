import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 8;
  margin: 8px auto;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  letter-spacing: 1px;
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
`;
