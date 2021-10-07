import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 8;
  margin: 18px 10px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  letter-spacing: 1px;
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  text-align: center;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  margin-bottom: 24px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  letter-spacing: 1px;
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.color.text1};
  background-color: ${({ theme }) => theme.color.text6};
  padding: 8px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
`;
