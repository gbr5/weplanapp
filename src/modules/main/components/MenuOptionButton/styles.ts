import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
  color: string;
}

export const Container = styled.TouchableOpacity<IProps>`
  border: 0.8px solid ${({ color }) => color};
  background-color: ${({ theme }) => theme.color.text5};
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  margin: 8px 0;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Icon = styled(Feather)<IProps>`
  color: ${({ color }) => color};
  font-size: ${RFValue(30)}px;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  margin: 0 16px 0 0;
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(24)}px;
`;
