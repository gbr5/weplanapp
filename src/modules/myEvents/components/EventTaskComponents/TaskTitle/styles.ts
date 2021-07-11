import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  position: relative;
`;

export const TitleButton = styled(BorderlessButton)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


export const Title = styled.Text`
  color: ${({ theme }) => theme.color.text1};
  font-family: ${({ theme }) => theme.fonts.roboto_medium};
  font-size: ${RFValue(18)}px;
  /* letter-spacing: 1px; */
`;

export const UnderlineTitle = styled.View`
  height: 2px;
  width: 100%;
  margin-top: 4px;
  background-color: ${({ theme }) => theme.color.primary};
`;

export const EditTitleIcon = styled(Feather)`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${RFValue(20)}px;
`;

export const IconContainer = styled.View`
  background-color: ${({ theme }) => theme.color.text2};
  padding: 4px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
