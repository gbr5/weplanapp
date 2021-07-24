import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  margin: 40px 0;
  flex: 1;
  width: 100%;
`;

export const Title = styled.Text`
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
`;
