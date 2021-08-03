import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 40px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.color.secondary};
`;

export const TitleButton = styled(BorderlessButton)`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const SectionTitle = styled.Text`
  margin-top: 16px;
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.color.secondary};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;

export const FilterContainer = styled.View`
  width: 100%;
  padding: 4px 16px;
`;

export const Underline = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.color.text3};
  height: 1.2px;
  margin: 4px 0;
`;

export const FilterLabel = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
`;
