import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  width: 100%;
  margin-top: 8px;
  border-radius: 5px;
  border: 0.5px solid ${({ theme }) => theme.color.text3};
  background-color: ${({ theme }) => theme.color.text6};
`;

export const FileContainer = styled.View`
  padding: 8px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const FileName = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  flex: 1;
  text-align: center;
  letter-spacing: 1px;
`;

export const EditButton = styled.TouchableOpacity`
  /* border: 0.5px solid ${({ theme }) => theme.color.text4};
  padding: 2px;
  border-radius: 2px; */
  margin-left: 8px;
  width: 40px;
  align-items: center;
  justify-content: center;
`;

export const EditIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.color.text1};
`;

export const CreatedAtContainer = styled.View`
  padding: 4px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  /* border: 0.5px solid ${({ theme }) => theme.color.text3}; */
  /* border-radius: 5px; */
`;

export const CreatedAt = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.secondary};
  letter-spacing: 1px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`;

export const Underline = styled.View`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.color.text3};
`;
