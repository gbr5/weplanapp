import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  justify-content: space-between;
  width: 100%;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-top: 16px;
`;

export const CancelButton = styled.TouchableOpacity`
  padding: 16px 4px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 45%;
  background-color: ${({ theme }) => theme.color.atention_light};
`;
export const Button = styled.TouchableOpacity`
  padding: 16px 4px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 45%;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
  text-align: center;
  margin-bottom: 16px;
`;
