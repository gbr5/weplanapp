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
  flex: 1;
  height: 120px;
  align-items: center;
  flex-direction: row;
  position: relative;
  margin: 8px auto 0;
  text-align: center;
`;

export const InputField = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.color.text1};
  font-family: 'RobotoSlab-Regular';
  font-size: ${RFValue(16)}px;
  background: ${({ theme }) => theme.color.text6};
`;

export const InputContainer = styled.View`
  width: 80%;
  height: 60px;
  padding: 0 16px;
  background: ${({ theme }) => theme.color.text6};
  margin: 8px auto;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.color.text2};
`;

export const InputIcon = styled(Feather)`
  margin-right: 16px;
  color: ${({ theme }) => theme.color.secondary};
  padding: 4px;
  border-radius: 4px;
  font-size: ${RFValue(18)}px;
`;
