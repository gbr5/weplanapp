import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;


export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(18)}px;
  margin-right: 8px;
  `;
export const ResumeContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
`;

export const ResumeTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text2};
  font-size: ${RFValue(16)}px;
`;

export const InputField = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.color.text1};
  font-family: 'RobotoSlab-Regular';
  font-size: ${RFValue(16)}px;
  background: ${({ theme }) => theme.color.text6};
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${({ theme }) => theme.color.text6};
  margin: 8px auto;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.color.text2};
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
  color: ${({ theme }) => theme.color.secondary};
  padding: 4px;
  border-radius: 4px;
  font-size: ${RFValue(18)}px;
`;
