import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.color.text6};
  border-radius: 5px;
  padding-top: 5px;
  justify-content: space-between;
  margin: 8px 0;
`;

export const TextNote = styled.Text`
  padding: 5px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(16)}px;
  margin: 8px 0 8px 8px;
`;


export const NoteFooter = styled.View`
  padding: 5px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.color.text5};
  border-radius: 5px;
  justify-content: space-between;
  border: 0.5px solid ${({ theme }) => theme.color.text4};
`;

export const NoteDate = styled.Text`
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${RFValue(14)}px;
`;

export const NoteAuthor = styled.Text`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(14)}px;
`;

export const EditNoteButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.text6};
  padding: 5px;
  align-items: center;
  justify-content: center;
`;

export const EditNoteIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.text1};
  font-size: ${RFValue(20)}px;
`;
