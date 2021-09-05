import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Input = styled.TextInput`
  padding-left: 8px;
  width: 100%;
`;

export const Icon = styled(Feather)`
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(24)}px;
  color: rgba(10, 95, 10, 1);
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.text6};
  border: none;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  padding: 5px;
  margin-left: 8px;
`;
export const Container = styled.View`
  width: 100%;
  height: 160px;
  align-items: center;
  flex-direction: row;
  position: relative;
  margin: 8px auto 0;
  text-align: center;
`;
