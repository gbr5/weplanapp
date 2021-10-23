import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.color.text6};
  border: 1px solid ${({ theme }) => theme.color.text4};
  border-radius: 8px;
  padding: 8px;
  margin: 8px 0 0;
  min-height: 80px;
`;

export const SectionButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(16)}px;
  letter-spacing: 1px;
`;

export const LabelUnderline = styled.View`
  width: 80%;
  height: 1.8px;
  margin-left: 0;
  background-color: ${({ theme }) => theme.color.primary};
`;
